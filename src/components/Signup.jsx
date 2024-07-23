import React, { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {toast} from 'react-hot-toast';
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Passwords Do Not Match");
      return;
    }

    const signupData = {
      ...formData
    }

    try{
      const response = await axios.post(`${BASE_URL}/signup`, signupData);
      localStorage.setItem('userId', response.data.user._id);
      // console.log("sign up response", response);
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message);
        navigate("/login");
      }else {
        toast.error("Something went wrong. Please try again later.");
      }
    }

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

  }

  const handleGoogleSignup = () => {
    // Logic for Google signup
    window.location.href = `https://taskmanager-oxp2.onrender.com/auth/google`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col gap-y-4 w-full max-w-md px-8 py-6 bg-gray-800 rounded-lg shadow-lg shadow-royalblue-700"
      >
        <div className="flex gap-4 w-full">
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="form-style w-full bg-gray-700 h-12 pl-4 rounded-lg text-gray-50 border"
            />
          </label>
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="form-style w-full bg-gray-700 h-12 pl-4 rounded-lg text-gray-50 border"
            />
          </label>
        </div>
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
        <label className="relative w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-300">
            Confirm Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm Password"
            className="form-style w-full bg-gray-700 h-12 pl-4 pr-10 rounded-lg text-gray-50 border"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showConfirmPassword ? (
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
          Sign Up
        </button>
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-400">Already have an account?</span>
          <NavLink to="/login" className="text-yellow-500 hover:underline">
            Login
          </NavLink>
        </div>
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="mt-4 flex items-center justify-center rounded-lg bg-white py-2 px-4 text-gray-900 font-medium hover:bg-royalblue-600 hover:text-white transition duration-300 border"
        >
          <FcGoogle className="mr-2" size={24} />
          Sign Up with Google
        </button>
      </form>
    </div>
  );
};

export default Signup;
