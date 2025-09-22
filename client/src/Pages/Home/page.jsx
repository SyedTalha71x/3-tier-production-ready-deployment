/* eslint-disable no-unused-vars */
import React from "react";
import StatCard from "../../Partials/StatsCard/page";
import AnalyticsCard from "../../Partials/AnalyticsCard/page";

const Page = () => {
  return (
    <div className="">
      <div className="mt-4">
        <StatCard />
      </div>
      <div className="mt-2">
        <AnalyticsCard />
      </div>

    </div>
  );
};

export default Page;
