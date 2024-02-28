import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Pet } from '../app/adopt_a_paw/page';
import { useSession } from 'next-auth/react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import Link from 'next/link';


const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  age: Yup.number().required('Age is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string()
    .typeError('That doesnt look like a phone number')
    .required('A phone number is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  postCode: Yup.string().required('Post Code is required'),
});


interface FormPopupProps {
    pets: Pet[];
    showForm: boolean;
    setShowForm: (show: boolean) => void;
    formSelectedPet: Pet | null;
    toggleFormPopup: (pet: Pet) => void;
}


export default function FormPopup ({
    pets,
    showForm,
    setShowForm,
    toggleFormPopup,
    formSelectedPet,
}: FormPopupProps) {

    const { data: session } = useSession();
    const [inputUserEmail, setInputUserEmail] = useState(session?.user?.email);
    const [inputUserName, setInputUserName] = useState(session?.user?.name);


  const formik = useFormik({
    initialValues: {
      fullName: inputUserName || '',
      age: '',
      email: inputUserEmail || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postCode: '',
    },
    validationSchema,
    onSubmit: (values) => {
    }
  });

  
  const updatePetAvailability = (petId: Pet) => {
    if (!petId) {
        console.error('No petId provided');
        return;
      }
        
      fetch('https://8lpzuux0q6.execute-api.ap-southeast-2.amazonaws.com/prod/updateAvailability', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ petId: petId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update pet availability.');
          }
          console.log('Pet availability updated successfully.');
          return response.json();
        })
        .then((data) => {
          console.log(data); 
        })
        .catch((error) => {
          console.error(error);
        });
  };
  

  const onSubmit = () => {
    if (
      formik.errors.fullName ||
      formik.errors.email ||
      formik.errors.age ||
      formik.errors.phone ||
      formik.errors.address ||
      formik.errors.city ||
      formik.errors.state ||
      formik.errors.postCode
    ) {
      alert('Please fill in all required fields and validate your Email.');
    } else {
        const pet = formSelectedPet;
        const applicationId = uuidv4(); 
        if (!pet) {
            console.error('No pet selected');
            return;
        }
        
        fetch('https://owqzy4n6cj.execute-api.ap-southeast-2.amazonaws.com/prod/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formik.values.fullName,
          email: formik.values.email,
          age: formik.values.age,
          phone: formik.values.phone,
          address: formik.values.address,
          city: formik.values.city,
          state: formik.values.state,
          postCode: formik.values.postCode,
          applicationId: applicationId,
          petId: pet.petId,
          petName: pet.name,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to submit application.');
          }
          return response.json();
        })
        .then((data) => {
          setShowForm(false);
          formik.resetForm();
          updatePetAvailability(pet.petId);
          alert('Application placed successfully!');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (

    <Transition.Root show={showForm} as={Fragment}>
    <Dialog as='div' className='fixed inset-0 overflow-hidden z-50' onClose={toggleFormPopup}>
      <Transition.Child
        as={Fragment}
        enter='ease-in-out duration-500'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in-out duration-500'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
      </Transition.Child>

      <div className='flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0'>
        <Transition.Child
          as={Fragment}
          enter='transform transition ease-in-out duration-500 sm:duration-700'
          enterFrom='translate-x-full'
          enterTo='translate-x-0'
          leave='transform transition ease-in-out duration-500 sm:duration-700'
          leaveFrom='translate-x-0'
          leaveTo='translate-x-full'
        >
          <div className='fixed inset-y-0 right-0 flex max-w-full pl-10'>
            <div className='w-screen max-w-md'>
              <div className='flex flex-col h-full bg-white shadow-xl'>
                <div className='flex items-center justify-between px-4 py-6 border-b border-gray-200'>
                  <Dialog.Title className='text-lg font-medium text-gray-900'>Inspection Application</Dialog.Title>
                  <button type='button' className='text-gray-400 hover:text-gray-500' onClick={toggleFormPopup}>
                    <span className='sr-only'>Close panel</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                <div className='flex-1 overflow-y-auto px-4 sm:px-6'>
                    <div className='flex flex-col justify-start text-left items-start mt-8 ml-3'>
                    {session ? (
                        <>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='space-y-4'>
                                <div className='mb-4'>
                                    <label htmlFor='fullName'>Full Name: </label>
                                    <input
                                        type='text'
                                        name='fullName'
                                        id='fullName'
                                        className=' border rounded-md px-2 py-1'
                                        value={inputUserName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={session ? true : false}
                                        />
                                        {formik.touched.fullName && formik.errors.fullName && (
                                        <div className='text-red-500'>{formik.errors.fullName}</div>
                                        )}
                                    </div>

                                    <div className='mb-4'>
                                        <label htmlFor='age'>Age: </label>
                                        <input
                                        type='number'
                                        name='age'
                                        id='age'
                                        className='border rounded-md px-2 py-1'
                                        value={formik.values.age}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.age && formik.touched.age && (
                                        <div className='text-red-500'>{formik.errors.age}</div>
                                        )}
                                    </div>

                                    <div className='mb-4'>
                                        <label htmlFor='email'>Email: </label>
                                        <input
                                        type='text'
                                        name='email'
                                        id='email'
                                        className='border rounded-md px-2 py-1'
                                        value={inputUserEmail}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        disabled={session ? true : false}
                                        />
                                        {formik.errors.email && formik.touched.email && (
                                        <div className='text-red-500'>{formik.errors.email}</div>
                                        )}
                                    </div>

                                    <div className='mb-4'>
                                        <label htmlFor='lastName'>Phone: </label>
                                        <input
                                        type='string'
                                        name='phone'
                                        id='phone'
                                        className='border rounded-md px-2 py-1'
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.phone && formik.touched.phone && (
                                        <div className='text-red-500'>{formik.errors.phone}</div>
                                        )}
                                    </div>

                                    <div className='mb-4'>
                                        <label htmlFor='address'>Address Line: </label>
                                        <input
                                        type='text'
                                        name='address'
                                        id='address'
                                        className='border rounded-md px-2 py-1'
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.address && formik.touched.address && (
                                        <div className='text-red-500'>{formik.errors.address}</div>
                                        )}
                                    </div>

                                    <div className='mb-4'>
                                        <label htmlFor='city'>City: </label>
                                        <input
                                        type='text'
                                        name='city'
                                        id='city'
                                        className='border rounded-md px-2 py-1'
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.city && formik.touched.city && (
                                        <div className='text-red-500'>{formik.errors.city}</div>
                                        )}
                                    </div>

                                    <div className='mb-4'>
                                        <label htmlFor='state'>State: </label>
                                        <select
                                        name='state'
                                        id='state'
                                        className='border rounded-md px-2 py-1'
                                        value={formik.values.state}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        >
                                        <option value=''>-- Please select --</option>
                                        <option value='ACT'>Australian Capital Territory</option>
                                        <option value='NSW'>New South Wales</option>
                                        <option value='NT'>Northern Territory</option>
                                        <option value='QLD'>Queensland</option>
                                        <option value='SA'>South Australia</option>
                                        <option value='TAS'>Tasmania</option>
                                        <option value='VIC'>Victoria</option>
                                        <option value='WA'>Western Australia</option>
                                        </select>
                                        {formik.errors.state && formik.touched.state && (
                                        <div className='text-red-500'>{formik.errors.state}</div>
                                        )}
                                    </div>

                                    <div className='mb-4'>
                                        <label htmlFor='postCode'>Post Code: </label>
                                        <input
                                        type='text'
                                        name='postCode'
                                        id='postCode'
                                        className='border rounded-md px-2 py-1'
                                        value={formik.values.postCode}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.postCode && formik.touched.postCode && (
                                        <div className='text-red-500'>{formik.errors.postCode}</div>
                                        )}
                                    </div>
                                </div>
                            </form>
                            </>
                            ): (
                                <>
                                <p className='text-center'>Please login to proceed.</p>
                                <div className='flex justify-start items-center h-full'>
                                  <Link href='/api/auth/signin'>
                                    <Button 
                                      type='button'
                                      title='Login'
                                      variant='btn_white'
                                    />
                                  </Link>
                                </div>
                              </>
                              )}  
                      </div>
                </div>  
                {session ? (
                <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
                    <p className='mt-0.5 text-sm text-gray-500'>When the form was submitted, the staff will contact you in 5 workdays.</p>
                    <div className='mt-6'>
                        <a className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'  onClick={onSubmit}>
                        Submit
                        </a>
                    </div>
                </div>
                ):
                <></>
                }               
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
  );
};