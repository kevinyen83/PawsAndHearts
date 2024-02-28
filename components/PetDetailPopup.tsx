import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Pet } from '../app/adopt_a_paw/page';

interface PetDetailPopupProps {
    formSelectedPet: Pet
    onClose: () => void;
    onReserve: () => void;
}

const PetDetailPopup = ({ formSelectedPet, onClose, onReserve }:PetDetailPopupProps) => {
    console.log(formSelectedPet)

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
        <div className='bg-white w-96 h-auto p-6 rounded-lg shadow-lg'>
            <div className='relative h-56  text-white bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40'>
                <img className='rounded-t-lg' src={formSelectedPet.image} alt={formSelectedPet.name} data-testid='cart-item-image' />
            </div>
            <h2 className='text-xl font-semibold mb-4'>{formSelectedPet.name}</h2>
            <div className='block font-sans text-base antialiased font-light leading-relaxed text-inherit'>
            <p className='mainArea-title' data-testid='cart-item-category'>
                <b>Category: </b>
                {formSelectedPet.category}
            </p>
            <p className='mainArea-title' data-testid='cart-item-name'>
                <b>Name: </b>
                {formSelectedPet.name}
            </p>
            <p className='mainArea-title' data-testid='cart-item-age'>
                <b>Age: </b>
                {formSelectedPet.age} 
            </p>
            <p className='mainArea-title' data-testid='cart-item-gender'>
                <b>Gender: </b>
                {formSelectedPet.gender}
            </p>
            <p className='mainArea-title' data-testid='cart-item-color'>
                <b>Color: </b>
                {formSelectedPet.color}
            </p>
            <p className='mainArea-title' data-testid='cart-item-size'>
                <b>Size: </b>
                {formSelectedPet.size}
            </p>
            <p className='mainArea-title' data-testid='cart-item-location'>
                <b>Location: </b>
                {formSelectedPet.location}
            </p>
            <p className='mainArea-title' data-testid='cart-item-vaccination'>
                <b>Vaccination: </b>
                {formSelectedPet.vaccination}
            </p>
            <p className='mainArea-title' data-testid='cart-item-availability'>
                <b>Availability: </b>
                {formSelectedPet.availability}
            </p>
            <p className='mb-4 text-base' data-testid='cart-item-description'>
                <b>Description: </b>
                {formSelectedPet.description}
            </p>
            </div>
            <div className='p-6 pt-0 flex flex-wrap justify-between'>
                <div>
                    <button
                    className='mt-4  align-middle select-none font-bold text-center text-xs py-3 px-6 rounded-full bg-gray-900 text-red-500 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
                    onClick={onReserve}
                    >
                    <FontAwesomeIcon icon={faHeart} size='lg' />
                    </button>
                </div>
                <div className='mt-4 flex justify-end'>
                    <div>
                        <button
                            className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none mr-2'
                            onClick={() => {
                                onReserve(); 
                                onClose(); 
                            }}
                        >
                            Adopt
                        </button>
                    </div>
                    <div>
                        <button
                            className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PetDetailPopup;
