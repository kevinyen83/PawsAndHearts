import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FormPopup from '../components/FormPopup';
import { submitApplication, updatePetAvailability  } from '../utils/api/api';

// Mock useSession hook
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mock fetch function
jest.mock('../utils/api/api');
const mockedSubmitApplication = submitApplication as jest.MockedFunction<typeof submitApplication>;
const mockedUpdatePetAvailability = updatePetAvailability as jest.MockedFunction<typeof updatePetAvailability>;

describe('FormPopup component', () => {
  test('Form submission', async () => {
    const toggleFormPopup = jest.fn();
    const onSubmit = jest.fn();

    // Mock session data
    const mockSession = {
      data: {
        user: {
          email: 'test@example.com',
          name: 'Test User',
        },
      },
    };

    // Mock useSession hook to return the mock session data
    require('next-auth/react').useSession.mockReturnValue(mockSession);

    const { getByLabelText, getByText } = render(
      <FormPopup
        pets={[{ petId: '1', name: 'Test Pet', category: 'Cat', age: '2', gender: 'Male', color: 'Black', size: 'Small', location: 'Test Location', vaccination: 'Yes', availability: 'Yes', description: 'Test Description', image: 'test.jpg' }]}
        showForm={true}
        setShowForm={toggleFormPopup}
        formSelectedPet={{ petId: '1', name: 'Test Pet', category: 'Cat', age: '2', gender: 'Male', color: 'Black', size: 'Small', location: 'Test Location', vaccination: 'Yes', availability: 'Yes', description: 'Test Description', image: 'test.jpg' }}
        toggleFormPopup={toggleFormPopup}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(getByLabelText('Full Name:'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Age:'), { target: { value: '30' } });
    fireEvent.change(getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(getByLabelText('Phone:'), { target: { value: '0405123123' } });
    fireEvent.change(getByLabelText('Address Line:'), { target: { value: '123 Test St' } });
    fireEvent.change(getByLabelText('City:'), { target: { value: 'Test City' } });
    fireEvent.change(getByLabelText('State:'), { target: { value: 'VIC' } });
    fireEvent.change(getByLabelText('Post Code:'), { target: { value: '3000' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
    expect(mockedSubmitApplication).toHaveBeenCalled();
    expect(mockedUpdatePetAvailability).toHaveBeenCalled();
  })
})
})
