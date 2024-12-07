import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { errors, success } from "../utils/tostify";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useConversationContext } from "../context/conversationContext";
import { useAuthContext } from "../context/AuthContext";
import profileImg from "../assets/profile.png";
import { useSocketContext } from "../context/socketContext";
import useListenMessage from "../socketHooks";

const Chats = ({ chatUserDetails }) => {
  const { chatUserId, profile, name } = chatUserDetails;
  const { auth } = useAuthContext();
  const { onlineUser } = useSocketContext();
  useListenMessage();

  const [message, setMessage] = useState("");
  const { currentConversation, setConversation } = useConversationContext();

  useEffect(() => {
    if (!chatUserId) return;

    let isMounted = true;

    async function getConversation() {
      try {
        const url = `http://localhost:8000/${chatUserId}`;

        const response = await axios.get(url, {
          method: "GET",
          withCredentials: true,
        });

        if (
          JSON.stringify(response.data.conversation) !==
            JSON.stringify(currentConversation) ||
          isMounted
        ) {
          setConversation(response.data.conversation || []);
        }
      } catch (error) {
        console.log(error);
        throw new Error(error);
      } finally {
      }
    }

    getConversation();
    isMounted = false;
  }, [chatUserId, setConversation]);

  function handleInput(e) {
    setMessage(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (message !== "") {
        const url = `http://localhost:8000/sendmessage/${chatUserId}`;
        const response = await axios.post(
          url,
          { message },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // success(response.data.msg);
        setConversation((prevConversation) => [...prevConversation, message]);
        setMessage("");
      } else {
        errors("type Message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <>
      <div className="flex flex-col border border-gray-300 w-[100%] h-[100%]">
        <div className="flex justify-start m-2 p-2 h-[14%] border-b-2 gap-4">
          <img
            src={profile !== "" ? profile : profileImg}
            alt="profile img"
            className=" h-[100%] rounded-3xl  border-l-white cursor-pointer"
          />
          <div className="flex justify-center flex-col">
            <h1 className=" text-white font-bold align-middle m-[1.5%]">
              {name}
            </h1>
            <h6 className=" font-mono text-sm">
              {onlineUser.includes(chatUserId) ? "Online" : "ofline"}
            </h6>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {currentConversation && currentConversation.length > 0 ? (
            currentConversation.map((con) => (
              <>
                <div
                  key={con._id}
                  className={`max-w-[75%] px-4 py-3 rounded-lg text-sm relative ${
                    con.senderId === auth.id
                      ? "self-end bg-blue-500 text-white"
                      : "self-start bg-gray-300 text-gray-800"
                  }  `}
                >
                  <p>{con.message}</p>
                </div>
                <div
                  className={`text-xs ${
                    con.senderId === auth.id
                      ? "text-right ml-auto"
                      : "text-left mr-auto"
                  }  text-gray-500 mt-0 pt-0`}
                >
                  {new Date(con.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </>
            ))
          ) : (
            <p className="text-center text-gray-500">No Messages Yet</p>
          )}
        </div>

        <div className=" border-t border-gray-300 p-4">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              name="message"
              onChange={handleInput}
              value={message}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition "
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Chats;
