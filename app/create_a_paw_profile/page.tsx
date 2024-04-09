'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'
import Button from '../../components/Button'
import { useSession } from 'next-auth/react'
import { useFormik } from 'formik'
import { uploadPet } from '../../utils/api/api'
import { v4 as uuidv4 } from 'uuid'


export interface PetProfileData {
    petId: string
    contactEmail: string
    contactPhone: string
    organizationName: string
    applicantName: string
    name: string
    category: string
    age: string
    gender: string
    color: string
    size: string
    location: string
    vaccination: string
    availability: string
    image: string
    description: string
  }

const PawProfileForm: React.FC = () => {
    const {data: session} = useSession()
    
    useEffect(() => {
        if(session){
            localStorage.setItem('session', JSON.stringify(session))
        }
    }, [session])


    const formik = useFormik({
        initialValues: {
            organizationName: '',
            applicantName: '',
            contactEmail: '',
            contactPhone: '',
            petId: '',
            name: '',
            category: '',
            age: '',
            color: '',
            gender: '',
            size: '',
            location: '',
            vaccination: '',
            availability: '',
            image: '',
            description: '',
        },
        onSubmit: async (values) => {
            const petId = uuidv4();
            try {
                if (formik.isValid) {
                    const petProfileData: PetProfileData = {
                        organizationName: values.organizationName,
                        applicantName: values.applicantName,
                        contactEmail: values.contactEmail,
                        contactPhone: values.contactPhone,
                        petId: petId,
                        name: values.name,
                        category: values.category,
                        age: values.age,
                        color: values.color,
                        gender: values.gender,
                        size: values.size,
                        location: values.location,
                        vaccination: values.vaccination,
                        availability: values.availability,
                        image: values.image,
                        description: values.description,
                    };
                    await uploadPet(petProfileData);
                    formik.resetForm()
                    alert('Pet profile created successfully!');
                    window.location.replace('/adopt_a_paw')
                } else {
                    alert('Please fill in all required fields.');
                }
            } catch (error) {
                console.error(error);
            }
        }
    })

  return (
    <>
        {session ? (
            <form className='max-w-md mx-auto mt-28 w-screen h-auto' onSubmit={formik.handleSubmit}> 
            <h2 className='leading-7 text-gray-900'>Organization Info</h2>
            <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='text'
                    name='organizationName'
                    id='organizationName'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    value={formik.values.organizationName}
                    onChange={formik.handleChange}
                    placeholder=' '
                    required
                />
                <label
                    htmlFor='organizationName'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    Organization Name
                </label>
                </div>
        
                <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='text'
                    name='applicantName'
                    id='applicantName'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    value={formik.values.applicantName}
                    onChange={formik.handleChange}
                    placeholder=' '
                    required
                />
                <label
                    htmlFor='applicantName'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    Applicant Name
                </label>
                </div>
        
                <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='relative z-0 w-full mb-5 group'>
                    <input
                    type='tel'
                    name='contactEmail'
                    id='contactEmail'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    value={formik.values.contactEmail}
                    onChange={formik.handleChange}
                    placeholder=' '
                    required
                    />
                    <label
                    htmlFor='contactEmail'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                    Contact Email
                    </label>
                </div>
                <div className='relative z-0 w-full mb-5 group'>
                    <input
                    type='text'
                    name='contactPhone'
                    id='contactPhone'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    value={formik.values.contactPhone}
                    onChange={formik.handleChange}
                    placeholder=' '
                    required
                    />
                    <label
                    htmlFor='contactPhone'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                    Contact Phone
                    </label>
                </div>
                </div>
        
                <br/>
                <h2 className='leading-7 text-gray-900'>Pet Info</h2>
        
        
                <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='text'
                    name='name'
                    id='name'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder=' '
                    required
                />
                <label
                    htmlFor='name'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    Pet Name
                </label>
                </div>
        
                <div className='grid md:grid-cols-2 md:gap-6'>
                <div className='relative z-0 w-full mb-5 group'>
                    <input
                    type='tel'
                    name='location'
                    id='location'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    placeholder=' '
                    required
                    />
                    <label
                    htmlFor='location'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                    Location
                    </label>
                    </div>
                    <div className='relative z-0 w-full mb-5 group'>
                        <input
                        type='number'
                        name='age'
                        id='age'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        placeholder=' '
                        required
                        />
                        <label
                        htmlFor='age'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                        >
                        Age
                        </label>
                    </div>
                </div>

                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='w-full'>
                        <label htmlFor='category' className='block text-sm font-medium leading-6 text-gray-50'>
                        Category
                        </label>
                        <div className='my-2'>
                            <select
                            id='category'
                            name='category'
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            autoComplete='category'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                            >
                            <option>-- Please select an option --</option>
                            <option>Dogs</option>
                            <option>Cats</option>
                            <option>Birds</option>
                            <option>Others</option>
                            </select>
                        </div>
                    </div>

                    <div className='w-full'>
                        <label htmlFor='gender' className='block text-sm font-medium leading-6 text-gray-50'>
                        Gender
                        </label>
                        <div className='my-2'>
                            <select
                            id='gender'
                            name='gender'
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            autoComplete='gender'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                            >
                            <option>-- Please select an option --</option>
                            <option>Female</option>
                            <option>Male</option>
                            <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='w-full'>
                        <label htmlFor='size' className='block text-sm font-medium leading-6 text-gray-50'>
                        Size
                        </label>
                        <div className='my-2'>
                            <select
                            id='size'
                            name='size'
                            value={formik.values.size}
                            onChange={formik.handleChange}
                            autoComplete='size'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                            >
                            <option>-- Please select an option --</option>
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            </select>
                        </div>
                    </div>

                    <div className='w-full'>
                        <label htmlFor='color' className='block text-sm font-medium leading-6 text-gray-50'>
                        Color
                        </label>
                        <div className='my-2'>
                            <select
                            id='color'
                            name='color'
                            value={formik.values.color}
                            onChange={formik.handleChange}
                            autoComplete='color'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                            >
                            <option>-- Please select an option --</option>
                            <option>Green</option>
                            <option>Black</option>
                            <option>Tabby</option>
                            <option>Brown</option>
                            <option>Orange</option>
                            <option>Gray</option>
                            <option>White</option>
                            <option>Blue</option>
                            <option>Red</option>
                            <option>Yellow</option>
                            <option>Calico</option>
                            <option>Black and White</option>
                            <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>
        
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className='w-full'>
                        <label htmlFor='vaccination' className='block text-sm font-medium leading-6 text-gray-50'>
                        Vaccination
                        </label>
                        <div className='my-2'>
                            <select
                            id='vaccination'
                            name='vaccination'
                            value={formik.values.vaccination}
                            onChange={formik.handleChange}
                            autoComplete='vaccination'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                            >
                            <option>-- Please select an option --</option>
                            <option>Yes</option>
                            <option>No</option>
                            </select>
                        </div>
                    </div>

                    <div className='w-full'>
                        <label htmlFor='availability' className='block text-sm font-medium leading-6 text-gray-50'>
                        Availability
                        </label>
                        <div className='my-2'>
                            <select
                            id='availability'
                            name='availability'
                            value={formik.values.availability}
                            onChange={formik.handleChange}
                            autoComplete='availability'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                            >
                            <option>-- Please select an option --</option>
                            <option>Yes</option>
                            <option>No</option>
                            </select>
                        </div>
                    </div>
                </div>
        
                <div className='relative z-0 w-full mb-5 group'>
                <input
                    type='text'
                    name='image'
                    id='image'
                    className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    placeholder=' '
                    required
                />
                <label
                    htmlFor='image'
                    className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                    Image URL
                </label>
                </div>


                <div className='relative z-0 w-full mb-5 group'>
                    <input
                        type='text'
                        name='description'
                        id='description'
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        placeholder=' '
                        required
                    />
                    <label
                        htmlFor='description'
                        className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                    >
                        Description
                    </label>
                </div>
        
                <button
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                type='submit'                >
                Submit
                </button>
            </form>
            ) : (
                <div className='flex flex-col justify-center items-center max-w-md mx-auto w-screen h-screen'>
                    <p className='text-center'>Please login to proceed.</p>
                    <div className=' p-5'>
                        <Link href='/api/auth/signin'>
                        <Button 
                            type='button'
                            title='Login'
                            variant='btn_white'
                        />
                        </Link>
                    </div>
                </div>
            )}
    </>
  )
}

export default PawProfileForm
