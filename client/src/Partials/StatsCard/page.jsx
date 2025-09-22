// eslint-disable-next-line no-unused-vars
import React from "react";
import { Map, WorkspacePremium, MonetizationOn } from "@mui/icons-material"


const Page = () => {

  const stats = [
    {
      title: "Total Roadmaps Generated",
      amount: "120", // backend se dynamic value aa sakti hai
      percentage: "+10%",
      icon: <Map className="text-white" />,
    },
    {
      title: "Current Subscription Tier",
      amount: "Pro Plan", // yahan subscription plan ka naam show hoga
      percentage: "",
      icon: <WorkspacePremium className="text-white" />,
    },
    {
      title: "Total Money Spent",
      amount: "$1,250", // backend se calculate hoga
      percentage: "+20%",
      icon: <MonetizationOn className="text-white" />,
    },
  ]
  
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:w-[97%] mx-auto w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {stats.map((item, index)=>{
       return <div key={index} className="bg-[#04082b] cursor-pointer p-4 rounded-xl text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-gray-400 font-semibold text-sm">{item.title}</h1>
              <div className="flex items-center">
                <span className="font-extrabold text-xl text-white">{item.amount}</span>
                <p className="ml-1 text-green-600 mt-0.5 font-extrabold text-sm">{item.percentage}</p>
              </div>
            </div>
            <div className="bg-blue-600 p-3 rounded-xl">
              {item.icon}
            </div>
          </div>
        </div> })}
      </div>
    </div>
  );
};

export default Page;
