import React from 'react';
import Image from 'next/image';
import catAndDog_img from '../assets/images/img_catAndDog.png';

export default function About() {
    return (
        <div className='flex h-screen orange-block'>
            {/* Left Section */}
            <div className='hidden md:flex md:w-1/2 items-center justify-center'>
                <div className='w-full flex items-center justify-center'>
                    <Image
                        src={catAndDog_img}
                        alt='Dog and Cat'
                        className='object-contain'
                        width={500}
                        height={500}
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className='w-full md:w-1/2 bg-gray-100 flex items-center justify-center'>
                <div className='p-8 max-w-lg mx-auto'>
                    <h2 className='text-2xl font-bold mb-4'>About Paws and Hearts</h2>
                    <p className='text-lg'>
                        Paws and Hearts is a dedicated charity organization committed to the welfare of animals. Our shelter provides a warm, safe, and loving home not only to dogs and cats but also various bird species. We believe in cherishing every life and strive to offer these furry and feathered friends a happy life. Join us in our mission to provide them with forever homes and raise awareness about animal welfare. Your support matters. Thank you for caring about Paws and Hearts.
                    </p>
                </div>
            </div>
        </div>
    );
}
