'use client';

import axios from 'axios';
import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DonateCard from '../../components/DonateCard';
import { useAppDispatch, useAppSelector } from '../GlobalRedux/store';
import { setPrices } from '../GlobalRedux/Feautures/prices-slice';
import { setIsLoading } from '../GlobalRedux/Feautures/loading-slice';

const DonatePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const prices = useAppSelector((state) => state.prices.prices);
  const isLoading = useAppSelector((state) => state.isLoading.isLoading);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axios.get('/api/getItems');
      dispatch(setPrices(data));
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      dispatch(setIsLoading(false));
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
      {isLoading ? (
        <div className="flex justify-center">
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 items-center mx-auto">
          {prices &&
            prices.map((price, index) => (
              <DonateCard price={price} key={price.id} index={index} />
            ))}
        </div>
      )}
    </section>
  );
};

export default DonatePage;
