import React, { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import {toast} from "react-hot-toast";
const BASE_URL = process.env.REACT_APP_BASE_URL

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  
  const handleOnSubmit = async (e)=>{
    e.preventDefault()
    try{
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      })
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      toast.success("Logged In")
      navigate("/dashboard");
    }catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Assuming 401 is used for both invalid email and invalid password
        if (error.response.data.message === "User is not Registered with Us Please SignUp to Continue") {
          toast.error("Email does not exist. Please sign up.");
          navigate("/signup");
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  }


  const handleGoogleLogin = () => {
    // Logic for Google login
    window.location.href = 'https://taskmanager-oxp2.onrender.com/auth/google';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-y-4 w-full max-w-md px-8 py-6 bg-gray-800 rounded-lg shadow-lg shadow-royalblue-700"
      >
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-style w-full bg-gray-700 h-12 pl-4 rounded-lg text-gray-50 border"
          />
        </label>
        <label className="relative w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="form-style w-full bg-gray-700 h-12 pl-4 pr-10 rounded-lg text-gray-50 border"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
        <button
          type="submit"
          className="mt-4 rounded-lg bg-yellow-500 py-2 px-4 font-medium text-gray-900 hover:bg-yellow-600 transition duration-300"
        >
          Sign In
        </button>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-400">Don't have an account?</span>
          <NavLink to="/signup" className="text-yellow-500 hover:underline">
            Sign Up
          </NavLink>
        </div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-4 flex items-center justify-center rounded-lg bg-white py-2 px-4 text-gray-900 font-medium hover:bg-royalblue-600 hover:text-white transition duration-300 border"
        >
          <FcGoogle className="mr-2" size={24} />
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;