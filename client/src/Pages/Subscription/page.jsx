/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { message } from 'antd';
import { useStateManage } from '../../Context/StateContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function SubscriptionPage() {
  const { API_URL } = useStateManage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-subscription`);
        setData(response.data.message);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        message.error('Failed to fetch subscription plans');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePurchase = async (subscriptionId) => {
    try {
      const token = localStorage.getItem('authToken');
      const stripe = await stripePromise;

      const response = await axios.post(
        `${API_URL}/purchase-subscription`,
        { subscriptionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data?.message?.id) {
        console.error('Invalid server response:', response.data);
        throw new Error('Invalid server response');
      }

      const result = await stripe.redirectToCheckout({ sessionId: response.data.message.id });
      if (result.error) message.error('Failed to redirect to checkout');
    } catch (error) {
      console.error('Error processing purchase:', error);
      message.error('An error occurred while processing your purchase');
    }
  };

  const getBgClass = (name) => {
    switch (name) {
      case 'Basic Plan': return 'bg-gray-100';
      case 'Standard Plan': return 'bg-yellow-100';
      case 'Premium Plan': return 'bg-purple-200';
      default: return 'bg-white';
    }
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (!data.length) return <div className="text-center text-gray-300">No subscription plans available</div>;

  return (
    <div className="md:p-6 p-3">
      <div className="flex justify-start flex-col items-start mb-6">
        <h2 className="text-2xl font-extrabold text-white sm:text-4xl">Choose Your Plan</h2>
        <p className="lg:text-xl md:text-xl sm:text-sm text-sm text-gray-300">
          Select the perfect subscription tier for your needs
        </p>
      </div>
      <div className="max-w-7xl mx-auto space-y-4 md:h-[400px] h-full mt-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
        {data.map((tier) => (
          <div key={tier.id} className={`${getBgClass(tier.name)} rounded-lg shadow-xl divide-y divide-gray-200`}>
            <div className="p-6">
              <h2 className="text-2xl leading-6 font-semibold text-gray-900">{tier.name}</h2>
              <p className="mt-4 text-3xl font-extrabold text-gray-900">${tier.price}</p>
              <ul className="mt-6 space-y-4">
              {Array.isArray(JSON.parse(tier.points)) &&
  JSON.parse(tier.points).map((feature, index) => (
    <li key={index} className="flex items-start">
      <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
      <p className="ml-3 text-base text-gray-700">{feature}</p>
    </li>
))}
              </ul>
            </div>
            <div className="px-6 py-4">
              <button
                onClick={() => handlePurchase(tier.id)}
                type="button"
                className="w-full bg-gray-800 hover:bg-gray-900 text-white rounded-md px-4 py-2 text-base font-medium focus:outline-none"
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
