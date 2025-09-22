/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateManage } from "../../Context/StateContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Otp = () => {
  const { API_URL } = useStateManage();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const otpCode = otp.join("");
    
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, { otp: otpCode });
      toast.success(response.data.message);
      navigate("/resetpassword");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-stretch">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
      
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
          <h2 className="text-4xl font-extrabold text-center text-white mb-10">
            Verify your OTP!
          </h2>

          <form className="space-y-4 " onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md outline-none bg-white focus:border-purple-600 text-gray-900"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>

            <button
              type="submit"
              className={`w-full py-2 mt-4 text-sm capitalize bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition duration-300 ${
                loading ? "bg-gray-500" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "VERIFY OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
