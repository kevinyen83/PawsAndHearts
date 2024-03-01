'use client'

import React, { useState, useEffect } from 'react';
import Favorites from '../../components/Favorites';
import FormPopup from '../../components/FormPopup';
import PetDetailPopup from '../../components/PetDetailPopup';
import '../../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { fetchPets } from '../../utils/api/api'; 

export interface Pet {
    petId: string;
    name: string;
    category: string;
    age: string;
    gender: string;
    color: string;
    size: string;
    location: string;
    vaccination: string;
    availability: string;
    description: string;
    image: string;
  }

interface Props {
  checkout: () => void;
  removeItem: () => void;
}

export default function AdoptAPaw() {

    const [pets, setPets] = useState<Pet[]>([]);
    const [isLoading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Pet detail state
  const [showPetDetail, setShowPetDetail] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  // Favorites state
  const [favoritesItems, setFavoritesItems] = useState<Pet[]>([]);
  const [isFavoritesEmpty, setIsFavoritesEmpty] = useState<boolean>(true);
  const [lastId, setLastId] = useState<number>(0);
  const [showFavorites, setShowFavorites]= useState(false);

  // Form state
  const [formSelectedPet, setFormSelectedPet] = useState<Pet | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postCode, setPostCode] = useState('');
  const [paymentType, setPaymentType] = useState(''); 
  const [showForm, setShowForm]= useState(false);

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

useEffect(() => {
    sessionStorage.setItem('favoritesItems', JSON.stringify(favoritesItems));
}, [favoritesItems]); 


  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category);
  };

  const filterPetsByCategory = (): Pet[] => {
        if (!pets || pets.length === 0) {
            return [];
        }
        if (selectedCategory === 'All') {
            return pets;
        }
      return pets.filter((pet) => pet.category === selectedCategory);
    }


  const handleShowMoreClick = (): void => {
    setVisiblePets((prevVisiblePets) => prevVisiblePets + 16);
  };

  const addToFavorites = (pet: Pet): void => {
    const petAlreadyInFavorites = favoritesItems.some((p: Pet) => p.name === pet.name);

    if (!petAlreadyInFavorites) {
      const newFavoritesItems = {
        ...pet,
        id: lastId + 1,
      };
      setFavoritesItems([...favoritesItems, newFavoritesItems]);
      setIsFavoritesEmpty(false);
      setLastId(lastId + 1);
      sessionStorage.setItem('favoritesItems', JSON.stringify([...favoritesItems, newFavoritesItems])); 
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
        const selectedPetFromPets = pets.find((p) => p.petId === pet.petId);
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
    <>
    <div className='relative flex flex-col items-center justify-center bg-slate-50'>

        {/* filter */}
            <div className='p-20'></div>
                <div className='flex flex-wrap justify-center sm:justify-start space-x-4'>
                    {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`p-10 align-middle font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-indigo-600 text-white shadow-md  hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none hover:bg-indigo-700  ${
                        selectedCategory === category ? 'bg-indigo-600' : ''
                        }`}
                    >
                        {category}
                    </button>
                    ))}
                </div>
            

        {/* main-area */}
            <div className='flex flex-wrap gap-4 pt-6 justify-center'>
                {isLoading && (
                    <div className='loading-container'>
                        <div className='loading-animation'></div>
                        <p>Loading pet data...</p>
                    </div>
                )}

                {pets &&filterPetsByCategory().slice(0, visiblePets).map((pet) => (
                <div key={pet.petId} className='relative flex flex-col m-2 text-gray-700 bg-white shadow-md rounded-xl sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'  data-testid='item-container'>
                    <div className='w-full p-3'>
                        <div className='relative h-44 overflow-hidden text-white rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40'>
                            <img className='rounded-lg' src={pet.image} alt={pet.name} data-testid='item-image' />
                        </div>

                        <div className='p-3 ' onClick={() => toggleCardDetailPopup(pet)}>
                            <h5 className='block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900' data-testid='item-name'>{pet.name}</h5>
                            <div className='block font-sans text-base antialiased font-light leading-relaxed text-inherit overflow-hidden h-20'>
                                <p data-testid='item-category'>
                                <b>Category: </b>
                                {pet.category}
                                </p>
                                <p data-testid='item-name'>
                                <b>Name: </b>
                                {pet.name}
                                </p>
                                <p data-testid='item-age'>
                                <b>Age: </b>
                                {pet.age} 
                                </p>
                                <p data-testid='item-gender'>
                                <b>Gender: </b>
                                {pet.gender}
                                </p>
                                <p data-testid='item-color'>
                                <b>Color: </b>
                                {pet.color}
                                </p>
                                <p data-testid='item-size'>
                                <b>Size: </b>
                                {pet.size}
                                </p>
                                <p data-testid='item-location'>
                                <b>Location: </b>
                                {pet.location}
                                </p>
                                <p data-testid='item-vaccination'>
                                <b>Vaccination: </b>
                                {pet.vaccination}
                                </p>
                                <p data-testid='favorites-item-availability'>
                                <b>Availability: </b>
                                {pet.availability}
                                </p>
                                <p className='mb-4 text-base text-neutral-600 dark:text-neutral-200' data-testid='favorites-item-description'>
                                    <b>Description: </b>
                                    {pet.description}
                                </p>
                            </div>
                        </div>                
                        <br />
                        <div className='p-6 pt-0 flex flex-row justify-between'>
                            <div>
                                <button
                                className='align-middle select-none font-bold text-center text-xs py-3 px-6 rounded-full bg-gray-900 text-red-500 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
                                onClick={() => addToFavorites(pet)}
                                data-testid='add-to-favorites-btn'
                                >
                                <FontAwesomeIcon icon={faHeart} size='lg' />
                                </button>
                            </div>
                            <div>
                                <button
                                className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
                                onClick={() => toggleFormPopup(pet)}
                                >
                                Adopt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>

            {/* show more */}
            {pets &&visiblePets < filterPetsByCategory().length && (
                <div className='flex justify-center m-14'>
                <button
                    className='p-t align-middle font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
                    onClick={handleShowMoreClick}
                >
                    Show More
                </button>
                </div>
            )}

            {/* pet-detail-popup */}
            {showPetDetail && selectedPet && (
                <PetDetailPopup toggleFormPopup={toggleFormPopup} formSelectedPet={formSelectedPet} selectedPet={selectedPet} onReserve={() => addToFavorites(selectedPet)} onClose={() => setShowPetDetail(false)} />
            )}

            {/* Favorites */}
            <div
                className='fixed right-6 bottom-6 bg-gray-900 text-red-500 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer  hover:shadow-lgfocus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85]'
                onClick={toggleFavoritesPopup}
                data-testid='favorites-trigger-btn'
            >
                <FontAwesomeIcon icon={faHeart} size='lg' />
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
    </>
  )
}