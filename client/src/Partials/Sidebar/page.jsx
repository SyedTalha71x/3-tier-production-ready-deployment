import { useState } from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star"; // Import Star icon
import { useStateManage } from "../../Context/StateContext";

const links = [
  { text: "Home", icon: "📥", to: "/", active: true },
  { text: "User Profile", icon: "⭐", to: "/profile", active: false },
  { text: "Career", icon: "✉️", to: "/career", active: false },
  { text: "Explore Now", icon: "📄", to: "/explorenow", active: false },
  { text: "Subscriptions", icon: "📬", to: "/subscriptions", active: false },
  { text: "Documentation", icon: "🗑️", to: "/documentation", active: false },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {isTransparent, isIconColor} = useStateManage();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="hamburger-icon  lg:hidden lg:p-4 md:p-6 sm:p-4 p-4 fixed top-0 left-2 z-40">
        <button
          className="text-white bg-blue-950 p-2 rounded-lg"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6h16.5M3.75 12h16.5m-16.5 6h16.5"
            />
          </svg>
        </button>
      </div>

      <div
       className={`fixed z-40 top-0 left-0 h-full min-h-screen text-white w-72 p-3 lg:rounded-xl md:rounded-xl sm:rounded-r-xl rounded-r-xl transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static`}
      style={{
        backgroundImage: isTransparent 
          ? "none" 
          : "url('https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/body-background.9e7d96f6.png')",
        backgroundPosition: "top left",
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat",
      }}
      >
        <div className="flex justify-start gap-2 items-start mb-4">
          <Link href={"/"}>
            <img src="/vite.svg" alt="Logo" className="rounded-full h-10 w-10" />
          </Link>
          <h2 className="text-lg font-extrabold mt-1">NextGenCareer</h2>
        </div>

        <div className="lg:hidden absolute top-2.5 right-2">
          <button
            className="text-white bg-blue-950 p-2 rounded"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-10 space-y-2">
          {links.map((link, index) => (
            <li
              key={index}
              className={`hover:bg-purple-600 lg:p-2 md:p-2 sm:p-1 p-1 transition-all duration-300 rounded-lg ${
                link.active ? "bg-purple-600" : ""
              }`}
            >
              <Link to={link.to}>
                <div className="flex text-sm items-center gap-2">
                <span className={`${isIconColor} p-1 rounded-md`}>{link.icon}</span>                  <span>{link.text}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Card */}
        <div className="absolute bottom-8 right-0 w-full px-4">
          <img
            src="https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/sidenav-card-background.00019e46.png"
            alt="Dummy"
            className="w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute inset-0 p-10 flex justify-start items-start flex-col">
            <div className="bg-white p-2 w-10 rounded-xl flex justify-center items-center">
              <StarIcon className="text-blue-500" />
            </div>
            <h1 className="text-white mt-1.5 font-extrabold text-sm">Need Help!</h1>
            <p className="text-white text-[13px]">Check our docs</p>
            <button className="bg-gray-600 font-extrabold text-white py-1 px-10 rounded-xl mt-2 transition transform hover:scale-90  duration-500 ease-in-out">
             <Link to={"/documentation"}>Documentation</Link> 
            </button>
          </div>
          <button className="bg-blue-500 w-full mt-2 cursor-pointer font-extrabold text-sm text-white py-2 rounded-xl transform hover:scale-110 transition duration-500 ease-in-out">
           <Link to={"/subscriptions"}> Upgrade to PRO</Link>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;

