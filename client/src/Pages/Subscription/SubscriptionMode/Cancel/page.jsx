/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-yellow-500 flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold mt-4">
          Subscription Canceled
        </h1>
        <p className="text-lg mt-2">
          It seems you have canceled the subscription process. If this was a mistake, you can go back and try again.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-white text-red-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CancelPage;
