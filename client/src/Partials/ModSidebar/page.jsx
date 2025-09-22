/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useStateManage } from "../../Context/StateContext";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setisSelected] = useState('bg-purple-600')
  const { setTransparent, setOpaque, isIconColor, setisIconColor, setisNavbg } = useStateManage();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className={`fixed top-0 right-0 cursor-pointer h-full lg:w-96 md:w-80 sm:w-64 w-full rounded-l-xl text-white p-6 transition-transform duration-500 transform  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundImage:
            "url('https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/body-background.9e7d96f6.png')",
          backgroundPosition: "top left",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
          zIndex: 1000,
        }}
      >
        {/* Close button */}
        <div className="flex justify-end">
          <button onClick={toggleSidebar}>
            <CloseIcon className="text-white" />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="mt-4">
          <div className="flex gap-1">
            <Link to={"/"}>
              <img
                src="/vite.svg"
                alt="Logo"
                className="rounded-full h-10 w-10"
              />
            </Link>
            <h2 className="lg:text-lg lg:mt-2 md:mt-2 sm:mt-2 mt-0 font-bold mb-4">
              NextGenCareer - Modifications
            </h2>
          </div>
          <div className="row h-[0.5px] mt-3 bg-slate-500 w-full"></div>
        </div>

        <div className="sidebar_colors mt-5">
          <h1 className="text-gray-300 text-lg">Sidenav Colors</h1>
          <div className="flex gap-1 mt-2">
            <div className={`bg-orange-500 rounded-full p-2 h-6 w-6`} onClick={()=>setisIconColor('bg-orange-500')}></div>
            <div className="bg-blue-300 rounded-full p-2 h-6 w-6" onClick={()=>setisIconColor('bg-blue-300')}></div>
            <div className="bg-purple-600 rounded-full p-2 h-6 w-6" onClick={()=>setisIconColor('bg-purple-600')}></div>
            <div className="bg-yellow-400 rounded-full p-2 h-6 w-6" onClick={()=>setisIconColor('bg-yellow-400')}></div>
            <div className="bg-red-600 rounded-full p-2 h-6 w-6" onClick={()=>setisIconColor('bg-red-600')}></div>
            <div className="bg-slate-500 rounded-full p-2 h-6 w-6" onClick={()=>setisIconColor('bg-slate-500')}></div>
          </div>
        </div>


        <div className="sidenav_type mt-7">
          <h1 className="text-gray-300 text-lg">Sidenav Type</h1>
          <p className="text-sm mt-1 font-bold text-gray-400">
            Choose between 2 different sidenav types.
          </p>
          <div className="mt-5 flex gap-3 justify-center items-center">
            <button
              onClick={setTransparent}
              className={`bg-transparent text-sm border-2 border-blue-700 text-blue-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-500 ease-in-out h-10 w-full `}
            >
              Transparent
            </button>
            <button
              onClick={setOpaque}
              className="bg-purple-600 text-sm text-white font-semibold rounded-lg hover:bg-transparent hover:text-blue-600 transition-all duration-500 ease-in-out h-10 w-full"
            >
              Opaque
            </button>
          </div>
        </div>


        <div className="navbars_colors mt-7">
          <h1 className="text-gray-300 text-lg">Navigation Colors</h1>
          <div className="flex gap-1 mt-2">
            <div className={`bg-orange-500 rounded-md p-2 h-6 w-6`} onClick={()=>setisNavbg('bg-orange-500')}></div>
            <div className="bg-blue-300 rounded-md p-2 h-6 w-6" onClick={()=>setisNavbg('bg-blue-300')}></div>
            <div className="bg-purple-600 rounded-md p-2 h-6 w-6" onClick={()=>setisNavbg('bg-purple-600')}></div>
            <div className="bg-yellow-400 rounded-md p-2 h-6 w-6" onClick={()=>setisNavbg('bg-yellow-400')}></div>
            <div className="bg-red-600 rounded-md p-2 h-6 w-6" onClick={()=>setisNavbg('bg-red-600')}></div>
            <div className="bg-slate-500 rounded-md p-2 h-6 w-6" onClick={()=>setisNavbg('bg-slate-500')}></div>
          </div>
        </div>
      </div>

      {/* Toggle button at bottom-right */}
      <div className="fixed bottom-2 right-7 z-50">
        <button
          className="bg-blue-500 z-50 text-white p-3 rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          <ArrowUpwardIcon />
        </button>
      </div>

      {/* Overlay (for small screens) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-20"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
