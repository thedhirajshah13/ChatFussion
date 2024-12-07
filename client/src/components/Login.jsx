import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import { success, errors } from "../utils/tostify";

const Login = () => {
  const { setAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({});
  const handleLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url = "http://localhost:8000/auth/login";
      const response = await axios.post(url, JSON.stringify(login), {
        method: "POST",
        // Include cookies
        headers: {
          "Content-Type": "application/json", // Ensure the correct content type
        },
        withCredentials: true,
      });

      const result = response.data;
      success(result.msg);
      setTimeout(() => {
        localStorage.setItem("chat-user", JSON.stringify(result));
        setAuth(result);
      }, 4000);

      // console.log(result);
    } catch (error) {
      console.log(`client->Login ${error}`);
      errors(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <>
        {loading ? (
          <div>
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className="min-h-screen bg-cover bg-center flex items-center justify-center relative">
            <div className="absolute inset-0 bg-black/10"></div>

            <div className=" bg-fuchsia-700 bg-opacity-10  rounded-lg  w-full max-w-md border border-white/50 z-30 relative backdrop-blur-sm p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-6 text-white">
                Login
              </h2>
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="email"
                    className="w-full p-2 mt-1 border rounded-md bg-white/20 text-white placeholder-white/70 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="abc123"
                    required
                    onChange={handleLogin}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full p-2 mt-1 border rounded-md bg-white/20 text-white placeholder-white/70 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="********"
                    required
                    onChange={handleLogin}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
      <ToastContainer />
    </>
  );
};

export default Login;
