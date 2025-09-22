/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useStateManage } from "../../Context/StateContext";
import axios from "axios";
import { message } from "antd";

const Page = () => {
  const { isNavbg, API_URL } = useStateManage();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [profilePicture, setprofilePicture] = useState(null);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/show-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data.formattedResponse);
        setprofilePicture(response.data.data.formattedResponse.profile_picture);
      } catch (error) {
        message.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [API_URL]);

  const logout = () => {
    localStorage.removeItem("authToken");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setisMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="lg:ml-2 md:ml-2 sm:ml-0  ml-0 cursor-pointer">
      <div
        className={`w-full  lg:rounded-xl md:rounded-xl sm:rounded-b-lg rounded-b-lg ${isNavbg} text-white flex justify-end items-center p-4`}
      >
        <div className="flex items-center space-x-4">
          <div>
            <NotificationsIcon
              className="text-yellow-500"
              style={{ fontSize: 30 }}
              onClick={() => setisMenuOpen((prev) => !prev)}
            />
          </div>
          {isMenuOpen && (
            <div
              ref={ref}
              className="absolute h-64 top-14 right-60 w-72 bg-white text-black rounded-lg shadow-lg p-4 z-50 overflow-y-auto"
            >
              <h3 className="font-bold text-lg mb-2">Notifications</h3>
              {data?.notifications?.length > 0 ? (
                <ul>
                  {data.notifications.map((notification, index) => (
                    <li
                      key={index}
                      className="py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                      {notification.message}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No notifications</p>
              )}
            </div>
          )}
          <div>
            <img
              className="w-10 h-10 p-1 rounded-full ring-2 ring-black dark:ring-black"
              src={
                profilePicture ||
                "https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"
              }
              alt="Bordered avatar"
            />
          </div>
          <div>
            <button
              onClick={logout}
              className="py-2 px-8 hover:bg-blue-800 transition-all duration-500 cursor-pointer rounded-lg text-white bg-blue-950 "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
