import React from 'react';
import Image from 'next/image';
import catAndDog_img_webp from '../assets/images/img-catAndDog.webp';

export default function About() {
  return (
    <div className="flex h-screen orange-block bg-gray-100 min-w-screen-sm">
      <div className="hidden md:flex md:w-1/2 items-center justify-center">
        <div className="w-full flex items-center justify-center">
          <Image
            src={catAndDog_img_webp}
            alt="Dog and Cat"
            className="object-contain z-20"
            width={500}
            height={500}
          />
        </div>
      </div>

      <div className="flex items-center justify-center z-20 sm:w-full">
        <div className="lg:p-20 sm:p-0">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-4">About Paws and Hearts</h2>
              <p className="text-lg">
                Paws and Hearts is a dedicated charity organization committed to
                the welfare of animals. Our shelter provides a warm, safe, and
                loving home not only to dogs and cats but also various bird
                species. We believe in cherishing every life and strive to offer
                these furry and feathered friends a happy life. Join us in our
                mission to provide them with forever homes and raise awareness
                about animal welfare. Your support matters. Thank you for caring
                about Paws and Hearts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
