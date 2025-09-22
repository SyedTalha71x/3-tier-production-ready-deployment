/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateManage } from "../../Context/StateContext";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const {API_URL, email} = useStateManage();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false)

  const handleShowPassword = () =>{
    setshowPassword((prev)=> !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        email,
        newPassword,
        confirmPassword,
      });
      console.log(email, newPassword, confirmPassword)
      toast.success(response.data.message);
      navigate("/login")
      
    } catch (error) {
      console.log(email, newPassword, confirmPassword)
      toast.error(error.response?.data?.message || "Failed to reset password");
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
          <h2 className="text-4xl font-extrabold text-center text-white mb-10">
            Reset your password!
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="new-password" className="block text-white">
                New Password
              </label>
              <input
                type={showPassword ? 'text':'password'}
                id="new-password"
                placeholder="Enter new password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-white">
                Confirm Password
              </label>
              <input
                 type={showPassword ? 'text':'password'}
                id="confirm-password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end">
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

            <button
              type="submit"
              className={`w-full py-2 text-sm capitalize bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition duration-300 ${
                loading ? "bg-gray-500" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "RESET PASSWORD"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
