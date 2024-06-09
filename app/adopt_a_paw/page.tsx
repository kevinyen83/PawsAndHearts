'use client';

import React, { useEffect } from 'react';
import Filter from '../../components/Filter';
import Favorites from '../../components/Favorites';
import FormPopup from '../../components/FormPopup';
import PetDetailPopup from '../../components/PetDetailPopup';
import MapPopup from '../../components/MapPopup';
import dynamic from 'next/dynamic';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'sonner';
import { Pet } from '../../types/pet-types';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { combinedSelector } from '../GlobalRedux/combin-selector';
import { useAppDispatch } from '../GlobalRedux/store';
import {
  setSelectedPet,
  setFormSelectedPet,
} from '../GlobalRedux/Feautures/pets-slice';
import {
  setShowFavorites,
  setShowForm,
  setShowPetDetail,
  setShowMap,
} from '../GlobalRedux/Feautures/popup-slice';
import {
  setFavoritesItems,
  setLastId,
  setIsFavoritesEmpty,
} from '../GlobalRedux/Feautures/favorites-slice';
import { setMapLocation } from '../GlobalRedux/Feautures/map-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const DynamicMain = dynamic(() => import('../../components/Main'), {
  loading: () => (
    <div className="my-10">
      <CircularProgress size={60} color="info" />,
    </div>
  ),
});

const AdoptAPaw = () => {
  const dispatch = useAppDispatch();
  const {
    pets,
    selectedPet,
    formSelectedPet,
    showFavorites,
    showForm,
    showPetDetail,
    showMap,
    favoritesItems,
    lastId,
    mapLocation,
  } = useSelector(combinedSelector);

  useEffect(
    () => {
      const storedFavoritesItems = sessionStorage.getItem('favoritesItems');
      if (storedFavoritesItems) {
        dispatch(setFavoritesItems(JSON.parse(storedFavoritesItems)));
      }
    },
    [dispatch]
  );

  useEffect(
    () => {
      sessionStorage.setItem('favoritesItems', JSON.stringify(favoritesItems));
    },
    [favoritesItems]
  );

  const addToFavorites = (pet: Pet): void => {
    const petAlreadyInFavorites = favoritesItems.some(
      (p: Pet) => p.name === pet.name
    );

    if (!petAlreadyInFavorites) {
      const newFavoritesItems = {
        ...pet,
        id: lastId + 1,
      };
      dispatch(setFavoritesItems([...favoritesItems, newFavoritesItems]));
      dispatch(setIsFavoritesEmpty(false));
      dispatch(setLastId(lastId + 1));
      sessionStorage.setItem(
        'favoritesItems',
        JSON.stringify([...favoritesItems, newFavoritesItems])
      );
      toast.success('Added to Favorites!');
    } else {
      toast.error('You already added this pet to Favorites.');
    }
  };

  const removeItem = (pet: Pet) => {
    const updatedItems = favoritesItems.filter(
      (p: { petId: string }) => p.petId !== pet.petId
    );
    dispatch(setFavoritesItems(updatedItems));
    dispatch(setIsFavoritesEmpty(updatedItems.length === 0));
  };

  const toggleFormPopup = (pet: Pet): void => {
    if (pet.availability === 'No') {
      toast.error('This pet is not available!');
    } else {
      if (pets.length === 0) {
        toast.error('Pets data is still loading. Please try again later.');
        return;
      }
      dispatch(setShowForm(true));
      dispatch(setFormSelectedPet(pet));
    }
  };

  const toggleCardDetailPopup = (pet: Pet): void => {
    dispatch(setSelectedPet(pet));
    dispatch(setShowPetDetail(true));
    dispatch(setFormSelectedPet(pet));
  };

  const toggleMapPopup = (pet: Pet): void => {
    dispatch(setMapLocation(pet.location));
    dispatch(setShowMap(true));
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-slate-50">
      <div className="p-20" />
      <Filter />
      <DynamicMain
        toggleCardDetailPopup={toggleCardDetailPopup}
        toggleMapPopup={toggleMapPopup}
        addToFavorites={addToFavorites}
        toggleFormPopup={toggleFormPopup}
      />
      {showPetDetail &&
        selectedPet && (
          <PetDetailPopup
            toggleFormPopup={toggleFormPopup}
            toggleMapPopup={toggleMapPopup}
            formSelectedPet={formSelectedPet}
            selectedPet={selectedPet}
            onReserve={() => addToFavorites(selectedPet)}
            onClose={() => dispatch(setShowPetDetail(false))}
          />
        )}
      {showMap &&
        mapLocation && (
          <MapPopup
            toggleMapPopup={toggleMapPopup}
            mapLocation={mapLocation}
            onClose={() => dispatch(setShowMap(false))}
          />
        )}
      <div
        className="fixed right-6 bottom-6 bg-gray-900 text-red-500 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer  hover:shadow-lgfocus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85]"
        onClick={() => dispatch(setShowFavorites(true))}
        data-testid="favorites-trigger-btn"
      >
        <FontAwesomeIcon icon={faHeart} size="lg" />
      </div>
      {showFavorites && (
        <Favorites
          favoritesItems={favoritesItems}
          selectedPet={selectedPet}
          removeItem={removeItem}
          toggleCardDetailPopup={toggleCardDetailPopup}
        />
      )}
      {showForm && (
        <FormPopup
          pets={pets}
          formSelectedPet={formSelectedPet}
          toggleFormPopup={toggleFormPopup}
        />
      )}
    </div>
  );
};

export default AdoptAPaw;
