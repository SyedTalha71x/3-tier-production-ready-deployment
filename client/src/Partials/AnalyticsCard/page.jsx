/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Chart from "react-apexcharts";
import { useStateManage } from "../../Context/StateContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Page = () => {
  const { API_URL } = useStateManage();
  const [data, setData] = useState(null);
  const [chartData, setchartData] = useState({ categories: [], series: [] });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/show-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setData(response.data.data.formattedResponse);

        console.log(response.data.data.formattedResponse);
      } catch (error) {
        console.log("Failed to catch the profile", error);
      }
    };
    fetchProfile();
  }, [API_URL]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-all-roadmaps`);
        console.log(response.data.message.data);

        const formattedResponseCheck = response.data.message.data;

        const categories = formattedResponseCheck.map((item) => item.pathName);
        const series = formattedResponseCheck.map((item) => item.percentage);
        setchartData({
          categories,
          series: [
            {
            name: "Roadmaps Completion",
            data: series,
            }
          ],
        });
      } catch (error) {
        console.log("Failed to catch the roadmaps", error);
      }
    };
    fetchRoadmaps();
  }, [API_URL]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        show: false,
        style: {
          colors: "#fff",
        },
      },
      title: {
        text: "",
        style: {
          color: "#fff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
        },
      },
      title: {
        text: "",
        style: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div className="lg:p-4 md:p-4 sm:p-3 p-0 grid grid-cols-1 lg:grid-cols-3 gap-4 mt-3 sm:mt-0">
      <div
        className="lg:col-span-2 bg-cover bg-center text-white lg:p-10 md:p-8 sm:p-3 p-3 rounded-xl"
        style={{
          backgroundImage:
            "url(https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/cardimgfree.5771cbbb.png)",
        }}
      >
        <div className="p-2 rounded-xl flex flex-col justify-start items-start">
          <h1 className="text-md font-semibold text-gray-400">
            Welcome, Back!
          </h1>
          <span className="font-extrabold text-3xl mt-3">
            { data?.username}
          </span>
          <p className="text-md text-gray-300 mt-2">
            Glad to see you again! Ask me anything.
          </p>
          <div className="mt-3">
            <button className="rounded-xl font-extrabold py-3 px-10 text-white bg-[#04082b] transition hover:bg-blue-900 duration-500 ease-in-out">
              <Link to={"/explorenow"}>Get Started</Link>
            </button>
          </div>
        </div>
      </div>

      <div
        className="bg-cover bg-top-left p-5 rounded-xl text-white shadow-lg"
        style={{
          backgroundImage:
            "url('https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/body-background.9e7d96f6.png')",
          backgroundPosition: "top left",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-xl font-extrabold">Satisfaction Rate</h2>
        <p className="text-gray-400 text-sm font-semibold">From all projects</p>

        <div className="relative mt-5 mb-4 flex justify-center items-center">
          {/* The outer ring */}
          <div className="w-36 h-36 rounded-full bg-transparent border-[10px] border-blue-600 border-opacity-40 flex items-center justify-center relative">
            {/* The inner ring and the icon */}
            <div className="w-28 h-28 rounded-full bg-[#10163a] flex items-center justify-center">
              <SentimentSatisfiedAltIcon
                className="text-white"
                style={{ fontSize: "3rem" }}
              />
            </div>
          </div>
        </div>
        <div className="bg-[#04082b] rounded-[30px] p-4">
          <div className="flex justify-between text-gray-400 font-semibold text-sm">
            <span>0%</span>
            <span>100%</span>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-extrabold">95%</h1>
            <p className="text-gray-400 font-semibold text-center text-sm">
              Based on likes
            </p>
          </div>
        </div>
      </div>

      <div
        className="lg:col-span-full lg:p-4 md:p-4 sm:p-3 p-3 rounded-xl"
        style={{
          backgroundImage:
            "url('https://demos.creative-tim.com/vision-ui-dashboard-react/static/media/body-background.9e7d96f6.png')",
          backgroundPosition: "top left",
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-xl font-extrabold  text-gray-200">
          Total Roadmaps
        </h2>
        {chartData.categories.length > 0 ? (
          <Chart
            options={chartOptions}
            series={chartData.series}
            type="bar"
            height={350}
            className="p-4"
          />
        ) : (
          <div className="text-white">Loading Chart Data</div>
        )}
      </div>
    </div>
  );
};

export default Page;
