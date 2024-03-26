'use client'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DonateCard from '../../components/DonateCard';



export default function DonatePage() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const { data } = await axios.get('/api/getItems');
      setPrices(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  const handlePayment = async(e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/payment',
    {
        priceId: prices.id
    },
    {
        headers: {
        'Content-Type': 'application/json',
        },
    }
    );
    window.location.assign(data)
    }

  return (
    <section className='w-full h-screen'>
         <div className='mx-auto max-w-4xl text-center mt-10 items-center pt-36'>
              <h2 className='text-3xl font-semibold leading-7 text-blue-700'>Donate Now</h2>
              <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>Select a plan!</p>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center'>Check out all the information below</p>
         </div>
         <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-[1040px] items-center mx-auto'>
           {prices && prices.map((price) => (
            <DonateCard price={price} key={price.id} />
           ))}
         </div>
   </section>
  );
}
