import React, { useEffect } from 'react';
import PetItem from './PetItem';
import { useSelector, useDispatch } from 'react-redux';
import { combinedSelector } from '../app/GlobalRedux/combin-selector';
import {
  setPetsState,
  setVisiblePets,
} from '../app/GlobalRedux/Feautures/pets-slice';
import { setIsLoading } from '../app/GlobalRedux/Feautures/loading-slice';
import { fetchPets } from '../utils/api/api-graphql';
import { Pet } from '../types/pet-types';
import { MainProps } from '../types/main-types';

const Main = ({
  toggleCardDetailPopup,
  toggleMapPopup,
  addToFavorites,
  toggleFormPopup,
}: MainProps) => {
  const dispatch = useDispatch();
  const { pets, visiblePets, category, isLoading } = useSelector(
    combinedSelector
  );

  useEffect(
    () => {
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
    },
    [dispatch]
  );

  const handleShowMoreClick = (): void => {
    const newVisiblePets = visiblePets + 16;
    dispatch(setVisiblePets(newVisiblePets));
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 pt-6 justify-center">
        {pets
          .filter(
            (pet: { category: any }) =>
              category === 'All' || pet.category === category
          )
          .slice(0, visiblePets)
          .map((pet: Pet) => (
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

      {pets &&
        !isLoading &&
        visiblePets <
          pets.filter(
            (pet: Pet) => category === 'All' || pet.category === category
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
    </>
  );
};

export default Main;
