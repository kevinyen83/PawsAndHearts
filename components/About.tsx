import React from 'react';
import Image from 'next/image';
import catAndDog_img from '../assets/images/img_catAndDog.png';
import '../styles.css';

export default function About() {
    return (
        <div className='flex h-screen relative justify-center items-center bg-slate-50 '>
            <div className='flex relative max-w-screen-xl mx-auto p-10 sm:p-0 '>
                {/* Left Section */}
                <div className='w-full sm:w-1/2 z-10 orange-block flex justify-center relative'>
                    <div className='p-10 sm:p-0 hidden md:block absolute -left-20 top-0'>
                        <Image
                            src={catAndDog_img}
                            alt='Dog and Cat'
                            className='w-[50%] h-auto object-contain'
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className='flex w-full z-20 justify-center items-center'>
                    <div className='flex p-20 bg-white rounded-lg shadow-xl items-center'>
                        <div>
                            <div className='bold-40 mb-4 text-left'>
                                About Paws and Hearts
                            </div>
                            <div className='regular-16 text-left'>
                                Paws and Hearts is a dedicated charity organization committed to the welfare of animals. Our shelter provides a warm, safe, and loving home not only to dogs and cats but also various bird species. We believe in cherishing every life and strive to offer these furry and feathered friends a happy life. Join us in our mission to provide them with forever homes and raise awareness about animal welfare. Your support matters. Thank you for caring about Paws and Hearts.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
