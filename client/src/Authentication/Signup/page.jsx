/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStateManage } from '../../Context/StateContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Signup = () => {
  const { API_URL } = useStateManage();
  const navigate = useNavigate();
  const [showPassword, setshowPassword] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, { username, email, password });
      toast.success('Signup successful!');
      navigate("/"); 
    } catch (error) {
      console.log("Signup Failed");
      toast.error('Signup failed. Please check your credentials.');
    }
  };

  const handleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };

  return (
    <div className="h-screen flex items-stretch">
      <div className="relative hidden md:block w-1/2 bg-cover" style={{
        backgroundImage: 'url(https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/signInImage.127192f6.png)',
        opacity: 0.8
      }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <h1 className="text-2xl font-semibold tracking-wide uppercase leading-tight">Inspired by the Future</h1>
          <p className="mt-3 text-3xl uppercase tracking-wider font-extrabold">Welcome to Mapping the Future</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8"
        style={{
          background: 'linear-gradient(159.02deg, rgb(15, 18, 59) 14.25%, rgb(9, 13, 46) 56.45%, rgb(2, 5, 21) 86.14%)'
        }}>
        <div className="lg:w-[60%] md:w-full sm:w-full w-full">
          <h2 className="lg:text-4xl text-3xl font-extrabold text-center text-white mb-10">Nice to see you!</h2>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label htmlFor="name" className="block text-white">Username</label>
              <input
                value={username}
                onChange={(e) => { setusername(e.target.value); }}
                type="name"
                id="name"
                placeholder="Your Username..."
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white">Email</label>
              <input
                value={email}
                onChange={(e) => { setemail(e.target.value); }}
                type="email"
                id="email"
                placeholder="Your email..."
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white">Password</label>
              <input
                value={password}
                onChange={(e) => { setpassword(e.target.value); }}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Your password..."
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={handleShowPassword}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-white">
                Show Password
              </label>
            </div>

            <button className="w-full py-2 text-sm capitalize bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition duration-300">
              SIGN UP
            </button>

            <div className="text-center mt-4">
              <p className="text-white">
                Already have an account?{" "}
                <a href="/login" className="text-gray-200 font-extrabold hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default Signup;
