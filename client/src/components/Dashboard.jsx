import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import profileImg from "../assets/profile.png";

import Chats from "./Chats";

import {
  ChatBubbleLeftEllipsisIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { success } from "../utils/tostify";
import { useSocketContext } from "../context/socketContext";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [chatUser, setChatUser] = useState(false);
  const [newChat, setnewChat]=useState(false)
  const { setAuth, auth } = useAuthContext();
  const { onlineUser } = useSocketContext(); // Online users from socket context


  const [chatUserDetails, setChatUserDetails] = useState({
    chatUserId: "",
    profile: "",
    name: "",
  });

  async function handleChatSlide(chatuserid, profile, name) {
    setChatUser(true);
    setChatUserDetails({
      chatUserId: chatuserid,
      profile: profile,
      name: name,
    });
    // GET Conversation
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const url = "http://localhost:8000/user/all";
        const response = await axios.get(url, {
          withCredentials: true,
        });
        const user = await response.data.user;
        console.log(response.data);
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  async function handleLogout() {
    try {
      setLoading(true);
      const url = "http://localhost:8000/auth/logout";
      const response = await axios.post(url, {
        withCredentials: true,
      });

      if (response) {
        success(response.data.msg);
        localStorage.setItem("chat-user", "");
        setAuth("");
      }
    } catch (error) {
      error(error.data.msg);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <div>
          <p>Loading....</p>
        </div>
      ) : (
        <div className="flex h-screen gap-2 p-[4%] ">
          {/* Left Sidebar */}
          <div className="w-[30%] backdrop-blur-md border-2 rounded-lg shadow-lg mt-[4%] mb-[4%] ml-[8%] h-[70vh] flex flex-col justify-between">
            {userLoading ? (
              <div>
                <h1>Loading.....</h1>
              </div>
            ) : (
              <div className="p-4 flex flex-col h-full">
                {/* Search Bar */}
                <div className="flex justify-between border-b ">
                  <h1 className="text-xl">Chats</h1>
                  <div className="flex justify-around gap-10 mb-4">
                    <button className="w-7 h-7">
                      <ChatBubbleLeftEllipsisIcon />
                    </button>
                    <button className="w-7 h-7">
                      <FunnelIcon />
                    </button>
                  </div>
                </div>
                <div className="sticky top-0 p-4 z-10">
                  <div className="flex justify-evenly gap-3">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="p-2 mb-4 border rounded-3xl text-white w-[90%]"
                    />
                    <span className="w-[20%]">
                      <button className="w-10 h-10 ">
                        <MagnifyingGlassIcon />
                      </button>
                    </span>
                  </div>
                  <hr />
                </div>

                {/* User List */}
                <div className="flex flex-col gap-2 m-5 overflow-y-auto h-[50vh] flex-grow">
                  {user.length > 0
                    ? user.map((user) => (
                      <React.Fragment key={user._id}>
                        <div
                          className="flex justify-start gap-4 cursor-pointer mr-1 rounded-md p-2 border-b"
                          style={
                            chatUserDetails.chatUserId === user._id
                              ? { backgroundColor: "#3B82F6" }
                              : {}
                          }
                          onClick={() => {
                            handleChatSlide(
                              user._id,
                              user.profileImg,
                              user.name
                            );
                          }}
                        >
                          <div className="relative inline-block">
                            {/* User Profile Image */}
                            <img
                              src={
                                user.profileImg ? user.profileImg : profileImg
                              }
                              alt="userImage"
                              className="w-12 h-12 border-2 rounded-full shadow-lg"
                            />
                            {/* Online Status Indicator */}
                            {onlineUser.includes(user._id) && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                          </div>

                          <h4 className="text-white font-bold">
                            {user.name}
                          </h4>
                        </div>
                        <hr className="w-full h-[1px] bg-gray-200 border-0 my-2" />
                      </React.Fragment>
                    ))
                    : "search for new Users"}
                </div>

                {/* Logout and User Info */}
                <div className="flex justify-between p-0 rounded-lg">
                  <button
                    className="w-[30px] h-[30px] bg-black rounded-lg"
                    onClick={handleLogout}
                  >
                    <ArrowLeftOnRectangleIcon />
                  </button>
                  <div className="flex gap-5 text-center">
                    <p className="text-center mt-2 font-bold">{auth.name}</p>
                    <img
                      src={auth.profileImg ? auth.profileImg : profileImg}
                      className="h-[40px] w-[40px] border-2 rounded-full shadow-lg cursor-pointer"
                      alt="imag"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="w-[70%] backdrop-blur-md border-2 rounded-lg shadow-lg mt-[4%] mb-[4%] mr-[8%] h-[70vh]">
            {chatUser ? (
              <Chats chatUserDetails={chatUserDetails} />
            ) : (
              <div className="flex m-[30%] text-white font-bold items-center justify-center">
                <h1>CHATFUSSION</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
