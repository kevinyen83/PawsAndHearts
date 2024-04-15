"use client";

import React, { useState } from "react";
import { Pets_Highlight } from "../constants";

interface PetHighlight {
  id: number;
  name: string;
  category: string;
  age: number;
  gender: string;
  color: string;
  size: string;
  location: string;
  vaccination: string;
  availability: string;
  description: string;
  image: string;
}

export default function PetCarousel() {
  const [petHighlight, setPetHightlight] = useState<PetHighlight[]>(
    Pets_Highlight
  );
  const [startIndex, setStartIndex] = useState(0);

  const handleClickLeft = () => {
    const newIndex =
      (startIndex - 3 + petHighlight.length) % petHighlight.length;
    setStartIndex(newIndex);
  };

  const handleClickRight = () => {
    const newIndex = (startIndex + 3) % petHighlight.length;
    setStartIndex(newIndex);
  };

  const visiblePets = petHighlight.slice(startIndex, startIndex + 3);

  return (
    <div className="h-full relative text-center py-10 pink-block orange-block-b min-w-screen-sm">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4">
        Our friends who are looking for a house
      </h2>

      {/* Carousel */}
      <div className="flex items-center justify-center p-4">
        <div className="cursor-pointer" onClick={handleClickLeft}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-4 pt-6 justify-center">
          {visiblePets.map((pet) => (
            <div
              key={pet.id}
              className="relative flex flex-col m-2 text-gray-700 bg-white shadow-md rounded-xl w-full sm:w-72 md:w-72 lg:w-72 xl:w-72"
            >
              <div className="w-full p-6">
                <div className="relative h-56 overflow-hidden rounded-t-xl">
                  <img
                    className="object-cover w-full h-full rounded-t-xl"
                    src={pet.image}
                    alt={pet.name}
                    data-testid="cart-item-image"
                  />
                </div>
                <div className="p-6">
                  <h5
                    className="block mb-2 font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900"
                    data-testid="cart-item-name"
                  >
                    {pet.name}
                  </h5>
                  <div className="block font-sans text-base antialiased font-light leading-relaxed text-inherit overflow-hidden h-20">
                    <p
                      className="mainArea-title"
                      data-testid="cart-item-category"
                    >
                      <b>Category: </b>
                      {pet.category}
                    </p>
                    <p className="mainArea-title" data-testid="cart-item-name">
                      <b>Name: </b>
                      {pet.name}
                    </p>
                    <p className="mainArea-title" data-testid="cart-item-age">
                      <b>Age: </b>
                      {pet.age}
                    </p>
                  </div>
                  <div className="mt-2">
                    <a href="/adopt_a_paw">
                      <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                        More Info
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cursor-pointer" onClick={handleClickRight}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center mt-4">
        <a href="/adopt_a_paw">
          <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
            Get to know the rest
          </button>
        </a>
      </div>
    </div>
  );
}
