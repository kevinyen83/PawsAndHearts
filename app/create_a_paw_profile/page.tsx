import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'


const CreateAPawProfile = () => {
  return (
        <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center'>
          <div className='text-4xl text-gray-800 mb-6'>
            <FontAwesomeIcon icon={faTools} className='mr-3' />
            Work in Progress
          </div>
          <p className='text-lg text-gray-600 mb-8'>
            This page is currently under construction. Please check back later.
          </p>
        </div>
      );
}

export default CreateAPawProfile
