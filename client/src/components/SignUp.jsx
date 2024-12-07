import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { success, errors } from "../utils/tostify";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const SignUp = () => {
  const { setAuth } = useAuthContext();
  const [loading, setloading] = useState(false);
  const [register, setRegister] = useState({});
  const Navigate = useNavigate();
  const handleRegister = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(register)
    const form = new FormData();
    form.append("name", register.name);
    form.append("username", register.username);
    form.append("password", register.password);
    form.append("confirmPassword", register.confirmPassword);
    form.append("gender", register.gender);
    form.append("file", register.file);

    try {
      setloading(true);
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        form,
        {
          method: "POST",
          // Include cookies

          withCredentials: true,
        }
      );

      // console.log(response.data.token);
      const data = response.data;

      if (response.status === 201) {
        // const data = response.data;
        success(data.msg);

        setTimeout(() => {
          localStorage.setItem("chat-user", JSON.stringify(data));
          setAuth(response);
          setRegister("");
          Navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      // const data = response.data;
      errors(error.response.data.msg);
    } finally {
      setloading(false);
    }
  };
  console.log(register);
  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
          // Replace with the correct image path
        >
          {/* This div covers the background image with a slight overlay */}
          <div className="absolute inset-0 bg-black/10"></div>

          <div className=" bg-fuchsia-700 bg-opacity-10  rounded-lg  w-full max-w-md border border-white/50 z-30 relative backdrop-blur-sm p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-white">
              Sign Up
            </h2>
            <form className="space-y-4  " onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 mt-1 border rounded-md bg-white/20 text-white placeholder-white/70 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Doe"
                  required
                  onChange={handleRegister}
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="username"
                  name="username"
                  id="email"
                  className="w-full p-2 mt-1 border rounded-md bg-white/20 text-white placeholder-white/70 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="abc123"
                  required
                  onChange={handleRegister}
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
                  onChange={handleRegister}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full p-2 mt-1 border rounded-md bg-white/20 text-white placeholder-white/70 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="********"
                  required
                  onChange={handleRegister}
                />
              </div>
              <div>
                <label
                  htmlFor="Gender"
                  className="block text-sm font-medium text-white"
                >
                  Gender
                </label>
                <select
                  className="w-full p-2 mt-1 border rounded-md bg-white/20  placeholder-white/70 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="********"
                  required
                  onChange={handleRegister}
                  name="gender"
                >
                  {" "}
                  <option>select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">female</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="Gender"
                  className="block text-sm font-medium text-white"
                >
                  Profile image
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => {
                    setRegister({ ...register, file: e.target.files[0] });
                  }}
                  className="w-full p-2 mt-1 border rounded-md bg-white/20  placeholder-white/70 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="********"
                />
              </div>
              <div className="">
                <Link
                  to="/login"
                  className="block text-sm font-medium text-white"
                >
                  Already have an Account ?{" "}
                  <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    {" "}
                    click here
                  </span>
                </Link>
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
      <ToastContainer />
    </>
  );
};

export default SignUp;
