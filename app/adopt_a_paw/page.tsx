'use client';

import React, { useEffect } from 'react';
import Favorites from '../../components/Favorites';
import FormPopup from '../../components/FormPopup';
import PetDetailPopup from '../../components/PetDetailPopup';
import PetItem from '../../components/PetItem';
import MapPopup from '../../components/MapPopup';
import '../../styles.css';
import { Pet } from '../../types/pet-types';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { fetchPets } from '../../utils/api/api';
import { useAppDispatch, useAppSelector } from '../GlobalRedux/store';
import { setCategoryState } from '../GlobalRedux/Feautures/category-slice';
import {
  setPetsState,
  setSelectedPet,
  setFormSelectedPet,
  setVisiblePets,
} from '../GlobalRedux/Feautures/pets-slice';
import { setIsLoading } from '../GlobalRedux/Feautures/loading-slice';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setMapLocation } from '../GlobalRedux/Feautures/map-slice';

const AdoptAPaw = () => {
  const dispatch = useAppDispatch();

  const pets = useAppSelector((state) => state.pets.pets);
  const selectedPet = useAppSelector((state) => state.pets.selectedPet);
  const formSelectedPet = useAppSelector((state) => state.pets.formSelectedPet);
  const visiblePets = useAppSelector((state) => state.pets.visiblePets);

  const category = useAppSelector((state) => state.category.category);
  const isLoading = useAppSelector((state) => state.isLoading.isLoading);

  const showFavorites = useAppSelector(
    (state) => state.showFavorites.showFavorites
  );
  const showForm = useAppSelector((state) => state.showForm.showForm);
  const showPetDetail = useAppSelector(
    (state) => state.showPetDetail.showPetDetail
  );
  const showMap = useAppSelector((state) => state.showMap.showMap);

  const favoritesItems = useAppSelector(
    (state) => state.favoritesItems.favoritesItems
  );
  const isFavoritesEmpty = useAppSelector(
    (state) => state.isFavoritesEmpty.isFavoritesEmpty
  );
  const lastId = useAppSelector((state) => state.lastId.lastId);
  const mapLocation = useAppSelector((state) => state.mapLocation.mapLocation);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setIsLoading(true));
        const data = await fetchPets();
        dispatch(setPetsState(data));
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedFavoritesItems = sessionStorage.getItem('favoritesItems');
    if (storedFavoritesItems) {
      dispatch(setFavoritesItems(JSON.parse(storedFavoritesItems)));
    }
  }, []);

  useEffect(
    () => {
      sessionStorage.setItem('favoritesItems', JSON.stringify(favoritesItems));
    },
    [favoritesItems]
  );

  const handleShowMoreClick = (): void => {
    const newVisiblePets = visiblePets + 16;
    dispatch(setVisiblePets(newVisiblePets));
  };

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
      alert('Added to Favorites!');
    } else {
      alert('You already added this pet to Favorites.');
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
      alert('This pet is not available!');
    } else {
      if (pets.length === 0) {
        alert('Pets data is still loading. Please try again later.');
        return;
      }
      const selectedPetFromPets = pets.find((p: Pet) => p.petId === pet.petId);
      dispatch(setShowForm(true));

      if (selectedPetFromPets) {
        dispatch(setFormSelectedPet(selectedPetFromPets));
      } else {
        console.error('Selected pet not found in pets array');
      }
    }
  };

  const toggleCardDetailPopup = (pet: Pet): void => {
    dispatch(setSelectedPet(pet));
    dispatch(setShowPetDetail(true));
    dispatch(setFormSelectedPet(pet));
  };

  const toggleMapPopup = (pet: Pet): void => {
    const selectedPetFromPets = pets.find((p: Pet) => p.petId === pet.petId);
    if (selectedPetFromPets) {
      const selectedLocation = selectedPetFromPets.location;
      dispatch(setMapLocation(selectedLocation));
      dispatch(setShowMap(true));
    }
  };

  const categories = ['All', 'Cats', 'Dogs', 'Birds', 'Others'];

  return (
    <div className="relative flex flex-col items-center justify-center bg-slate-50">
      {/* filter */}
      <div className="p-20" />
      <div className="flex flex-wrap justify-center sm:justify-start space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            data-cy="adotp-page-filter-btn"
            onClick={() => dispatch(setCategoryState(category))}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {category}
          </button>
        ))}
      </div>

      {/* main-area */}
      <div className="flex flex-wrap gap-4 pt-6 justify-center">
        {isLoading && (
          <div className="loading-container">
            <div className="loading-animation" />
            <p>Loading pet data...</p>
          </div>
        )}

        {!isLoading &&
          pets
            .filter((pet) => category === 'All' || pet.category === category)
            .slice(0, visiblePets)
            .map((pet) => (
              <PetItem
                key={pet.petId}
                pet={pet}
                toggleCardDetailPopup={toggleCardDetailPopup}
                toggleMapPopup={toggleMapPopup}
                addToFavorites={addToFavorites}
                toggleFormPopup={toggleFormPopup}
              />
            ))}
      </div>

      {/* show more */}
      {pets &&
        visiblePets <
          pets.filter((pet) => category === 'All' || pet.category === category)
            .length && (
          <div className="flex justify-center m-14">
            <button
              className="p-t align-middle font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              onClick={handleShowMoreClick}
            >
              Show More
            </button>
          </div>
        )}

      {/* pet-detail-popup */}
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

      {/* map-popup */}
      {showMap &&
        mapLocation && (
          <MapPopup
            toggleMapPopup={toggleMapPopup}
            mapLocation={mapLocation}
            onClose={() => dispatch(setShowMap(false))}
          />
        )}

      {/* Favorites */}
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

      {/* form-popup */}
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
