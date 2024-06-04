import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex h-screen min-screen-sm xl:w-screen bg-hero-background bg-right bg-contain bg-no-repeat blue-block">
      <div className="flex items-center gap-20 py-32 md:pl-44 md:gap-28 lg:py-20 sm-justify-center xl:flex-row">
        {/* Left Section */}
        <div className="md:w-[500px] sm:w-full sm:mx-auto lg:mx-0 xl:mx-0 xl:flex-col xl:justify-end xl:items-center">
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <div className="bold-52 mb-4">Not only people need a house.</div>
            <div className="mb-8">
              We believe in providing loving homes for our furry friends. Every
              pet deserves compassion and care. Join us in providing forever
              homes.
            </div>
            <div className="flex justify-center">
              <Link href="/adopt_a_paw">
                <button
                  data-cy="hero-makeAFriend-btn"
                  className="btn_pink rounded"
                >
                  Make a friend
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Call to action btn */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
          <div className="animate-bounce w-16 h-16 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 5.25 12 12.75 19.5 5.25M4.5 11.75 12 19.25 19.5 11.75"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
