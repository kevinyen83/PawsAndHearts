import React from 'react';
import Image from 'next/image';
import dog_img from '../assets/images/img_dog.png';

const Donation = () => {
  return (
    <div className='flex flex-col md:flex-row h-screen items-center p-10 w-full max-w-full mx-auto bg-slate-50'>
      {/* Left col */}
      <div className='md:w-1/2'>
        <Image
          src={dog_img}
          alt='Donation Image'
          className='w-[70%] h-auto mx-auto md:ml-auto md:mr-auto mb-4 md:mb-0'
        />
      </div>

      {/* Right col */}
      <div className='md:w-1/2 md:pl-10'>
        <h2 className='text-2xl font-semibold mb-4'>
          In addition, you can make a donation
        </h2>
        <p className='text-lg mb-4'>
          Name of the bank / Type of bank account
        </p>
        <div className='bg-yellow-200 p-4 flex items-center w-[60%]'>
          <div className='text-4xl text-blue-500'>💳</div>
          <p className='ml-4'>
            Random Bank Account Number: <strong>1234-5678-9012-3456</strong>
          </p>
        </div>
        <div className='mt-4 text-gray-600'>
          <p>1. Your donation supports our mission.</p>
          <p>2. Every contribution makes a difference.</p>
          <p>3. We appreciate your generosity.</p>
          <p>4. Contact us for more donation options.</p>
          <p>5. Thank you for your support!</p>
        </div>
        <p className='mt-4 text-gray-600'>
          Make a difference today by donating to our cause.
        </p>
      </div>
    </div>
  );
};

export default Donation;
