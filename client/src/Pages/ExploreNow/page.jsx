/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { SendOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Input, Button, Tooltip, message } from "antd";
import React, { useEffect } from "react";
import { useStateManage } from "../../Context/StateContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;

const examplePrompts = [
  "Build a successful tech startup",
  "Learn machine learning in 6 months",
  "Develop a fitness routine for weight loss",
];

export default function Page() {
  const { API_URL } = useStateManage();
  const navigate = useNavigate();
  const { setpathId } = useStateManage();
  const [prompt, setPrompt] = React.useState("");
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [roadmapData, setRoadmapData] = React.useState(null);
  const [recentRoadmaps, setRecentRoadmaps] = React.useState([]); 
  const [hasSubscription, setHasSubscription] = React.useState(false);

  useEffect(() => {
    const fetchRecentRoadmaps = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-user-paths`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.status === 200) {
          setRecentRoadmaps(response.data.message );
        } else {
          message.error("Failed to load recent roadmaps.");
        }
      } catch (error) {
        console.error("Error fetching recent roadmaps:", error);
        message.error("An error occurred while fetching recent roadmaps.");
      }
    };

    fetchRecentRoadmaps();
  }, [API_URL]);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await axios.get(`${API_URL}/check-subscription`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (response.status === 200 && response.data.message.isSubscribed) {
          setHasSubscription(true);
        } else {
          setHasSubscription(false);
        }
      } catch (error) {
        console.error("Subscription check failed:", error);
        setHasSubscription(false);
      }
    };

    checkSubscription();
  }, [API_URL]);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      message.error("Please enter a valid prompt");
      return;
    }

    if (!hasSubscription) {
      message.warning("Please purchase a subscription to generate a roadmap.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/create-path`,
        {
          name: prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Roadmap generated successfully!");
        setpathId(response.data.data.id);
        setRoadmapData(response.data.data);
        setTimeout(() => {
          navigate('/career')
        }, 2000);
      } else {
        message.error(response.data.message || "Failed to generate roadmap");
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
      message.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:p-4 md:p-4 sm:p-2 p-2 py-8 bg-gray-900 min-h-screen">
      <div className="flex sm:flex-row items-center mb-6">
        <div className="flex justify-start items-center gap-2">
          <h1 className="text-lg sm:text-2xl text-white font-extrabold">
            Vision To Roadmap
          </h1>
          <Tooltip
            title="Enter your vision in the box below to generate the roadmap"
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
      </div>

      <p className="text-white text-sm md:text-base mb-4">
        Enter your vision or goal, and we'll generate a detailed roadmap to help
        you achieve it.
      </p>

      <div className="mb-4">
        <p className="text-white text-sm mb-2">Example prompts:</p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((example, index) => (
            <Button
              key={index}
              size="small"
              className="bg-gray-700 text-white border-none"
              onClick={() => setPrompt(example)}
            >
              {example}
            </Button>
          ))}
        </div>
      </div>

      <div className="w-full mx-auto">
        <div className="relative">
          <TextArea
            placeholder="How can we help you?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mb-4 bg-slate-100 w-full"
            autoSize={{ minRows: 4, maxRows: 8 }}
            style={{ fontSize: "16px" }}
            maxLength={500}
          />
          <span className="absolute bottom-5 right-2 text-gray-500 text-sm">
            {prompt.length}/500
          </span>
        </div>
        <div className="flex justify-end items-center">
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSubmit}
            className="bg-purple-600 text-white border-none w-full sm:w-auto disabled:bg-slate-500 disabled:text-black"
            size="large"
            loading={isLoading}
            disabled={prompt.trim().length === 0 || !hasSubscription}
          >
            {isLoading ? "Generating..." : "Generate Roadmap"}
          </Button>
        </div>
      </div>

      {!hasSubscription && (
        <p className="text-white cursor-pointer text-center bg-purple-600 p-4 rounded-xl mt-4">
          Please purchase a subscription to unlock roadmap generation.
        </p>
      )}

      <div className="mt-8">
        <h2 className="text-white text-xl mb-4">Recent Roadmaps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentRoadmaps.length > 0 ? (
            recentRoadmaps.map((roadmap, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2">{roadmap.path}</h3>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No recent roadmaps available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
