import React from 'react';
import { PetItemProps } from '../types/pet-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const PetItem = ({
  pet,
  toggleCardDetailPopup,
  addToFavorites,
  toggleFormPopup,
}: PetItemProps) => {
  return (
    <div
      key={pet.petId}
      className="relative flex flex-col m-2 text-gray-700 bg-white shadow-md rounded-xl sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      data-testid="item-container"
    >
      <div className="w-full p-3">
        <div className="relative h-44 overflow-hidden text-white rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <img
            className="rounded-lg"
            src={pet.image}
            alt={pet.name}
            data-testid="item-image"
          />
        </div>

        <div className="p-3 " onClick={() => toggleCardDetailPopup(pet)}>
          <h5
            className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
            data-testid="item-name"
          >
            {pet.name}
          </h5>
          <div className="block font-sans text-base antialiased font-light leading-relaxed text-inherit overflow-hidden h-20">
            <p data-testid="item-category">
              <b>Category: </b>
              {pet.category}
            </p>
            <p data-testid="item-name">
              <b>Name: </b>
              {pet.name}
            </p>
            <p data-testid="item-age">
              <b>Age: </b>
              {pet.age}
            </p>
            <p data-testid="item-gender">
              <b>Gender: </b>
              {pet.gender}
            </p>
            <p data-testid="item-color">
              <b>Color: </b>
              {pet.color}
            </p>
            <p data-testid="item-size">
              <b>Size: </b>
              {pet.size}
            </p>
            <p data-testid="item-location">
              <b>Location: </b>
              {pet.location}
            </p>
            <p data-testid="item-vaccination">
              <b>Vaccination: </b>
              {pet.vaccination}
            </p>
            <p data-testid="favorites-item-availability">
              <b>Availability: </b>
              {pet.availability}
            </p>
            <p
              className="mb-4 text-base text-neutral-600 dark:text-neutral-200"
              data-testid="favorites-item-description"
            >
              <b>Description: </b>
              {pet.description}
            </p>
          </div>
        </div>
        <br />
        <div className="p-6 pt-0 flex flex-row justify-between">
          <div>
            <button
              className="align-middle select-none font-bold text-center text-xs py-3 px-6 rounded-full bg-gray-900 text-red-500 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              onClick={() => addToFavorites(pet)}
              data-testid="add-to-favorites-btn"
            >
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </button>
          </div>
          <div>
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              onClick={() => toggleFormPopup(pet)}
            >
              Adopt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetItem;
