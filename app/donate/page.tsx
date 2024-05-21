'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DonateCard from '../../components/DonateCard';
import '../../styles.css';

interface Price {
  id: string;
  unit_amount: number;
}

const DonatePage: React.FC = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const { data } = await axios.get('/api/getItems');
      setPrices(data);
      setLoading(true);
      console.log(data);
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-screen">
      <div className="mx-auto max-w-4xl text-center mt-10 items-center pt-36">
        <h2 className="text-3xl font-semibold leading-7 text-blue-700">
          Donate Now
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Select a plan!
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">
          Check out all the information below
        </p>
      </div>
      <div className="flex flex-col justify-center">
        {isLoading && (
          <div className="loading-container">
            <div className="loading-animation" />
            <p>Loading plan data...</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-8 items-center mx-auto">
        {prices &&
          prices.map((price, index) => (
            <DonateCard price={price} key={price.id} index={index} />
          ))}
      </div>
    </section>
  );
};

export default DonatePage;
