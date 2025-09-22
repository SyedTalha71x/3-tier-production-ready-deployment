/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import { message, Tooltip } from "antd";
import { useStateManage } from "../../Context/StateContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Roadmap = () => {
  const navigate = useNavigate();
  const { API_URL, pathId } = useStateManage();
  const [data, setData] = useState({ roadmap: { steps: [] } }); 
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    if(!pathId){
      message.info("Please enter the prompt first!")
      navigate('/explorenow')
    }
  }, [])
  

  useEffect(() => {
    console.log('Current pathId:', pathId);
    const token = localStorage.getItem("authToken");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/get-path-details/${pathId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data.roadmap);
        console.log("Response Data for career page ", response.data.data.roadmap);
      } catch (error) {
        console.log(error);
      }
    };

    if (pathId) {
      fetchData();
    }
  }, [pathId]);

  return (
    <div className="cursor-pointer">
      <div className="flex gap-1 p-2 items-center cursor-pointer">
        <span className="text-2xl text-green-600">
          <h1 className="text-xl font-extrabold text-gray-100">
            Career Roadmap
          </h1>
        </span>
        <Tooltip
          title="Steps is in paragraph and skills are in blue box in below cards"
          trigger="click"
          open={tooltipVisible}
          onVisibleChange={setTooltipVisible}
        >
          <InfoCircleOutlined
            className="text-white text-lg sm:text-xl cursor-pointer sm:mt-0"
            onClick={() => setTooltipVisible(!tooltipVisible)}
          />
        </Tooltip>
      </div>
      <div className="mt-4 bg-blue-950 rounded-xl lg:p-4 md:p-4 sm:p-2 p-2">
        <VerticalTimeline>
          {data.steps && data.steps.length > 0 ? (
            data.steps.map((step, index) => (
              <VerticalTimelineElement
                key={index}
                iconStyle={{ background: "#10073b", color: "white" }}
                contentStyle={{
                  backgroundColor: "#B2FEFA",
                  borderRadius: "5px",
                }}
                icon={
                  <div className="flex items-center justify-center w-full h-full text-xl font-extrabold">
                    {index + 1}
                  </div>
                }
              >
                <div>
                  <h3 className="vertical-timeline-element-title lg:text-md md:text-md sm:text-sm text-sm font-bold text-gray-800">
                    {step.name}
                  </h3>
                  <p className="text-gray-700">
                    <div className="flex gap-1 flex-wrap ">
                      {step.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="bg-purple-600 lg:text-xs md:text-xs sm:text-[10px] text-[10px] text-white rounded-md py-1.5 px-2"
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </p>
                </div>
              </VerticalTimelineElement>
            ))
          ) : (
            <div className="text-gray-600 text-center">
              <p>No roadmap data available. Please create a path first.</p>
            </div>
          )}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Roadmap;
