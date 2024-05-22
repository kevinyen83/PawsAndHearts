import React from 'react';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pet } from '../types/pet-types';

interface PetDetailPopupProps {
  formSelectedPet: Pet | null;
  selectedPet: Pet;
  onClose: () => void;
  onReserve: () => void;
  toggleFormPopup: (pet: Pet) => void;
}

const PetDetailPopup = ({
  formSelectedPet,
  selectedPet,
  onClose,
  onReserve,
  toggleFormPopup,
}: PetDetailPopupProps) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      data-cy="pet-detail-popup-container"
    >
      <div className="bg-white w-96 h-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="relative h-56 text-white bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 overflow-hidden">
          <img
            className="rounded-t-lg w-full h-full object-cover"
            data-cy="pet-detail-popup-image"
            src={selectedPet.image}
            alt={selectedPet.name}
            data-testid="pet-detail-popup-image"
          />
        </div>
        <h2
          className="text-xl font-semibold pt-4 mb-4"
          data-cy="pet-detail-popup-title"
        >
          {selectedPet.name}
        </h2>
        <div className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          <p
            data-cy="pet-detail-popup-category"
            data-testid="pet-detail-popup-category"
          >
            <b>Category: </b>
            {selectedPet.category}
          </p>
          <p
            data-cy="pet-detail-popup-name"
            data-testid="pet-detail-popup-name"
          >
            <b>Name: </b>
            {selectedPet.name}
          </p>
          <p data-cy="pet-detail-popup-age" data-testid="pet-detail-popup-age">
            <b>Age: </b>
            {selectedPet.age}
          </p>
          <p
            data-cy="pet-detail-popup-gender"
            data-testid="pet-detail-popup-gender"
          >
            <b>Gender: </b>
            {selectedPet.gender}
          </p>
          <p
            data-cy="pet-detail-popup-color"
            data-testid="pet-detail-popup-color"
          >
            <b>Color: </b>
            {selectedPet.color}
          </p>
          <p
            data-cy="pet-detail-popup-size"
            data-testid="pet-detail-popup-size"
          >
            <b>Size: </b>
            {selectedPet.size}
          </p>
          <p
            data-cy="pet-detail-popup-location"
            data-testid="pet-detail-popup-location"
          >
            <b>Location: </b>
            {selectedPet.location}
          </p>
          <p
            data-cy="pet-detail-popup-vaccination"
            data-testid="pet-detail-popup-vaccination"
          >
            <b>Vaccination: </b>
            {selectedPet.vaccination}
          </p>
          <p
            data-cy="pet-detail-popup-availability"
            data-testid="pet-detail-popup-availability"
          >
            <b>Availability: </b>
            {selectedPet.availability}
          </p>
          <p
            data-cy="pet-detail-popup-description"
            data-testid="pet-detail-popup-description"
          >
            <b>Description: </b>
            {selectedPet.description}
          </p>
        </div>
        <div className="p-6 pt-0 flex flex-wrap justify-between">
          <div>
            <button
              className="mt-4 align-middle select-none font-bold text-center text-xs py-3 px-6 rounded-full bg-gray-900 text-red-500 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              onClick={onReserve}
            >
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </button>
          </div>
          <div className="mt-4 flex justify-end">
            <div>
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mr-2"
                data-cy="pet-detail-popup-adopt-btn"
                onClick={() => {
                  onClose();
                  if (formSelectedPet) {
                    toggleFormPopup(formSelectedPet);
                  }
                }}
              >
                Adopt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailPopup;
