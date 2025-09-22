/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack'; 
import {useStateManage} from '../../Context/StateContext'


const Login = () => {
  const {API_URL} = useStateManage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showPassword, setshowPassword] = useState(false)
  const { enqueueSnackbar } = useSnackbar(); 
  const navigate = useNavigate();

  const handleShowPassword = () =>{
    setshowPassword((prev)=>!prev)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const token = response.data.data.token;
      localStorage.setItem('authToken', token);
      enqueueSnackbar('Login successful!', { variant: 'success' });
      navigate('/'); 
    } catch (error) {
      enqueueSnackbar('Login failed. Please check your credentials.', { variant: 'error' });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="h-screen flex items-stretch">
      <div
        className="relative hidden md:block w-1/2 bg-cover"
        style={{
          backgroundImage:
            "url(https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/signInImage.127192f6.png)",
          opacity: 0.8, 
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <h1 className="text-2xl font-semibold tracking-wide uppercase leading-tight">
            Inspired by the Future
          </h1>
          <p className="mt-3 text-3xl uppercase tracking-wider font-extrabold">
            Welcome to Mapping the Future
          </p>
        </div>
      </div>

      <div
        className="w-full md:w-1/2 flex items-center justify-center p-8"
        style={{
          background:
            "linear-gradient(159.02deg, rgb(15, 18, 59) 14.25%, rgb(9, 13, 46) 56.45%, rgb(2, 5, 21) 86.14%)",
        }}
      >
        <div className="lg:w-[60%] md:w-full sm:w-full w-full">
          <h2 className="lg:text-4xl text-3xl font-extrabold text-center text-white mb-10">
            Nice to see you!
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email..."
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white">
                Password
              </label>
              <input
                type={showPassword ? 'text':'password'}
                id="password"
                placeholder="Your password..."
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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


            <div className="flex items-center justify-end">
              <a href="/verifyemail" className="text-gray-200 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full py-2 text-sm capitalize text-white font-bold rounded-lg transition duration-300 ${loading ? 'bg-gray-500' : 'bg-purple-600 hover:bg-purple-700'}`}
              disabled={loading} 
            >
              {loading ? 'Loading...' : 'SIGN IN'} 
            </button>

            <div className="text-center mt-4">
              <p className="text-white">
                Don’t have an account?{" "}
                <a
                  href="/signup"
                  className="text-gray-200 font-extrabold hover:underline"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
