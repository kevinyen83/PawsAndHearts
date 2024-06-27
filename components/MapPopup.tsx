import React, { useEffect } from 'react';
import { MapProps } from '../types/map-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MapItem from './MapItem';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../app/GlobalRedux/store';
import { setCoordinates } from '../app/GlobalRedux/Feautures/map-slice';

const MapPopup = ({ mapLocation, onClose }: MapProps) => {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector((state) => state.coordinates.coordinates);
  const isLoading = useAppSelector((state) => state.isLoading.isLoading);
  const mapboxSecretKey = process.env.MAPBOX_SECRET_KEY as string;

  if (!mapboxSecretKey) {
    throw new Error('Mapbox secret key is not defined');
  }

  useEffect(
    () => {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${mapLocation}.json`,
            {
              params: {
                access_token: mapboxSecretKey,
              },
            }
          );
          const { data } = response;
          if (data.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            dispatch(setCoordinates({ lng, lat }));
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      };

      fetchCoordinates();
    },
    [mapLocation]
  );

  return (
    <div className="flex items-center justify-center bg-black bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 z-50">
      <div className="bg-white w-[70%] h-[90%] min-w-96 p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between">
          <div>
            <div className="text-3xl mb-3">
              <div>Map</div>
            </div>
            <div className="flex text-lg justify-start mb-1">
              <h1>Location: {mapLocation}</h1>
            </div>
          </div>
          <div className="flex justify-end items-start">
            <button
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
        <hr className="mb-2 h-1 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        <div className="flex flex-col justify-center items-center">
          {coordinates ? (
            <MapItem coordinates={coordinates} />
          ) : (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </div>

        <div className="absolute bottom-4 right-4">
          <button
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            onClick={onClose}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPopup;
