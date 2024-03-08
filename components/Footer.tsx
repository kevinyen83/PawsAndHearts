import React from 'react'

const Footer = () => {
    return (
        <footer className='flexCenter mb-24 pt-20'>
            <div className='flex flex-col justify-between'>
            <div className='text-center py-10'>
                    <h2 className='text-2xl font-semibold mb-4'>Contact Us</h2>

                    <div className='flex justify-center items-center space-x-12'>
                        <div className='text-gray-500'>
                        <p className='text-lg font-semibold'>Animal Shelter Center</p>
                        <p>123 Shelter Street</p>
                        <p>City, Zip Code</p>
                        <p>Country</p>
                        </div>

                        <div className='text-gray-500'>
                        <p className='text-lg font-semibold'>Contact Information</p>
                        <p>Email: info@animalshelter.com</p>
                        <p>Phone: +1 (123) 456-7890</p>
                        </div>

                        <div className='text-gray-500'>
                        <p className='text-lg font-semibold'>Office Hours</p>
                        <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                        <p>Saturday: 10:00 AM - 2:00 PM</p>
                        <p>Sunday: Closed</p>
                        </div>
                    </div>
            </div>

            <div className='padding-container max-container flex w-full flex-col gap-14'>
                <p className='regular-14 w-full text-center text-gray-30'>2023 Paws and Hearts | All rights reserved</p>
            </div>
            </div>
        </footer>
    )
}

export default Footer