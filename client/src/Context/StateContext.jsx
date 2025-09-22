/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [email, setEmail] = useState("")
  const [pathId, setpathId] = useState()
  const [isTransparent, setIsTransparent] = useState(false);
  const [isIconColor, setisIconColor] = useState('bg-purple-600')
  const [isNavbg, setisNavbg] = useState('bg-purple-600')
  const API_URL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_PRODUCTION_API_URL : import.meta.env.VITE_API_BASE_URL;
  console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
  console.log("PRODUCTION_API_URL:", import.meta.env.VITE_PRODUCTION_API_URL);
  console.log("API URL:", API_URL);
 
  const setTransparent = () => {
    setIsTransparent(true);
  };

  const setOpaque = () => {
    setIsTransparent(false); 
  };

  return (
    <StateContext.Provider value={{ isTransparent, setTransparent, setOpaque , isIconColor, setisIconColor,
        setisNavbg, isNavbg, API_URL, email, setEmail, pathId, setpathId
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateManage = () => useContext(StateContext);
