/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateManage } from '../../Context/StateContext';

const VerifyEmail = () => {
  const { API_URL, setEmail } = useStateManage();
  const [emailState, setEmailState] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/request-for-otp`, { email: emailState });
      toast.success('Verification email sent!');
      setEmail(emailState)
      navigate('/verifyotp');
    } catch (error) {
      toast.error('Failed to send verification email.');
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-4xl font-extrabold text-center text-white mb-10">Forgot your password?</h2>

          <form className="space-y-4" onSubmit={handleEmail}>
            <div>
              <label htmlFor="email" className="block text-white">Email</label>
              <input
                type="email"
                value={emailState}
                onChange={(e) => setEmailState(e.target.value)}
                id="email"
                placeholder="Enter your email..."
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none"
                required
              />
            </div>
            
            <button
              type="submit"
              className={`w-full py-2 mt-4 text-sm capitalize text-white font-bold rounded-lg transition duration-300 ${loading ? 'bg-gray-500' : 'bg-purple-600 hover:bg-purple-700'}`}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'VERIFY'}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default VerifyEmail;
