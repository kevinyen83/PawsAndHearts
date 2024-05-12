'use client';

import React, { useState, useEffect } from 'react';
import Favorites from '../../components/Favorites';
import FormPopup from '../../components/FormPopup';
import PetDetailPopup from '../../components/PetDetailPopup';
import PetItem from '../../components/PetItem';
import '../../styles.css';
import { Pet } from '../../types/pet-types';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { fetchPets } from '../../utils/api/api';
import { useAppDispatch, useAppSelector } from '../GlobalRedux/store';
import { setCategoryState } from '../GlobalRedux/Feautures/category/category-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdoptAPaw = () => {
  // Pets state
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  // Category
  const dispatch = useAppDispatch();
  const categoryState = useAppSelector((state) => state.category.categoryState);

  // Pet detail state
  const [showPetDetail, setShowPetDetail] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  // Favorites state
  const [favoritesItems, setFavoritesItems] = useState<Pet[]>([]);
  const [isFavoritesEmpty, setIsFavoritesEmpty] = useState<boolean>(true);
  const [lastId, setLastId] = useState<number>(0);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  // Form state
  const [formSelectedPet, setFormSelectedPet] = useState<Pet | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Show more state
  const [visiblePets, setVisiblePets] = useState<number>(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchPets();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedFavoritesItems = sessionStorage.getItem('favoritesItems');
    if (storedFavoritesItems) {
      setFavoritesItems(JSON.parse(storedFavoritesItems));
    }
  }, []);

  useEffect(
    () => {
      sessionStorage.setItem('favoritesItems', JSON.stringify(favoritesItems));
    },
    [favoritesItems]
  );

  const handleShowMoreClick = (): void => {
    setVisiblePets((prevVisiblePets) => prevVisiblePets + 16);
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
      setFavoritesItems([...favoritesItems, newFavoritesItems]);
      setIsFavoritesEmpty(false);
      setLastId(lastId + 1);
      sessionStorage.setItem(
        'favoritesItems',
        JSON.stringify([...favoritesItems, newFavoritesItems])
      );
      alert('Added to Favorites!');
    } else {
      alert('You already added this pet to Favorites.');
    }
  };

  const toggleFavoritesPopup = (): void => {
    setShowFavorites(!showFavorites);
  };

  const removeItem = (pet: Pet) => {
    const updatedItems = favoritesItems.filter((p) => p.petId !== pet.petId);
    setFavoritesItems(updatedItems);
    setIsFavoritesEmpty(updatedItems.length === 0);
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
      setShowForm(!showForm);

      if (selectedPetFromPets) {
        setFormSelectedPet(selectedPetFromPets);
      } else {
        console.error('Selected pet not found in pets array');
      }
    }
  };

  const toggleCardDetailPopup = (pet: Pet): void => {
    setSelectedPet(pet);
    setShowPetDetail(true);
    setFormSelectedPet(pet);
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
            .filter(
              (pet) => categoryState === 'All' || pet.category === categoryState
            )
            .slice(0, visiblePets)
            .map((pet) => (
              <PetItem
                key={pet.petId}
                pet={pet}
                toggleCardDetailPopup={toggleCardDetailPopup}
                addToFavorites={addToFavorites}
                toggleFormPopup={toggleFormPopup}
              />
            ))}
      </div>

      {/* show more */}
      {pets &&
        visiblePets <
          pets.filter(
            (pet) => categoryState === 'All' || pet.category === categoryState
          ).length && (
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
            formSelectedPet={formSelectedPet}
            selectedPet={selectedPet}
            onReserve={() => addToFavorites(selectedPet)}
            onClose={() => setShowPetDetail(false)}
          />
        )}

      {/* Favorites */}
      <div
        className="fixed right-6 bottom-6 bg-gray-900 text-red-500 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer  hover:shadow-lgfocus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85]"
        onClick={toggleFavoritesPopup}
        data-testid="favorites-trigger-btn"
      >
        <FontAwesomeIcon icon={faHeart} size="lg" />
      </div>
      {showFavorites && (
        <Favorites
          favoritesItems={favoritesItems}
          showFavorites={showFavorites}
          selectedPet={selectedPet}
          setIsFavoritesEmpty={setIsFavoritesEmpty}
          removeItem={removeItem}
          setShowFavorites={setShowFavorites}
          toggleCardDetailPopup={toggleCardDetailPopup}
        />
      )}

      {/* form-popup */}
      {showForm && (
        <FormPopup
          pets={pets}
          showForm={showForm}
          setShowForm={setShowForm}
          formSelectedPet={formSelectedPet}
        />
      )}
    </div>
  );
};

export default AdoptAPaw;
