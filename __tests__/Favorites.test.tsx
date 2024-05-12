import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import AdoptAPaw from '../app/adopt-a-paw/page';
import { fetchPets } from '../utils/api/api';
import ReduxProvider from '../app/GlobalRedux/redux-provider';

jest.mock('../utils/api/api');
const mockedFetchPet = fetchPets as jest.MockedFunction<typeof fetchPets>;

describe('AdoptAPaw component', () => {
  const renderWithReduxProvider = (component: React.ReactNode) => {
    return {
      ...render(<ReduxProvider>{component}</ReduxProvider>),
    };
  };

  test('render pets data successfully', async () => {
    mockedFetchPet.mockResolvedValue([
      {
        petId: '0',
        name: 'Fluffy',
        category: 'Dog',
        age: '3',
        gender: 'Male',
        color: 'White',
        size: 'Medium',
        image:
          'https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?b=1&s=612x612&w=0&k=20&c=-niqIUX8Kfiyn50xgUzxxUYX6H2q9BlGc3PX5PVM-iA=',
        location: 'City Park',
        vaccination: 'Yes',
        availability: 'Available',
        description: 'A friendly and playful dog.',
      },
      {
        petId: '1',
        name: 'Ruby',
        category: 'Cat',
        age: '10',
        gender: 'Male',
        color: 'Black',
        size: 'Large',
        image:
          'https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?b=1&s=612x612&w=0&k=20&c=-niqIUX8Kfiyn50xgUzxxUYX6H2q9BlGc3PX5PVM-iA=',
        location: 'Central Station',
        vaccination: 'Yes',
        availability: 'Available',
        description: 'A friendly and playful cat.',
      },
    ]);

    renderWithReduxProvider(<AdoptAPaw />);

    await waitFor(() => {
      const itemContainers = screen.getAllByTestId('item-container');
      itemContainers.forEach((container) => {
        expect(container).toBeInTheDocument();
        const itemImage = container.querySelector('[data-testid="item-image"]');
        const itemName = container.querySelector('[data-testid="item-name"]');
        const itemAge = container.querySelector('[data-testid="item-age"]');
        const itemGender = container.querySelector(
          '[data-testid="item-gender"]'
        );
        const itemColor = container.querySelector('[data-testid="item-color"]');
        const itemSize = container.querySelector('[data-testid="item-size"]');
        const itemLocation = container.querySelector(
          '[data-testid="item-location"]'
        );
        const itemVaccination = container.querySelector(
          '[data-testid="item-vaccination"]'
        );
        expect(itemImage).toBeInTheDocument();
        expect(itemName).toBeInTheDocument();
        expect(itemAge).toBeInTheDocument();
        expect(itemGender).toBeInTheDocument();
        expect(itemColor).toBeInTheDocument();
        expect(itemSize).toBeInTheDocument();
        expect(itemLocation).toBeInTheDocument();
        expect(itemVaccination).toBeInTheDocument();
      });
    });
  });

  test('Add pet to favorites and check if it appears in Favorites popup', async () => {
    const { getByTestId, getAllByTestId } = renderWithReduxProvider(
      <AdoptAPaw />
    );

    // Find the first card
    await waitFor(() => {
      const addToFavoritesButtons = getAllByTestId('add-to-favorites-btn');
      const addToFavoritesButton = addToFavoritesButtons[0];
      const triggerFavoritesSideMenu = getByTestId('favorites-trigger-btn');

      // Click on the 'Add to Favorites' button
      fireEvent.click(addToFavoritesButton);
      fireEvent.click(triggerFavoritesSideMenu);
    });

    // Wait for the Favorites popup to appear and check the cols
    await waitFor(() => {
      expect(getByTestId('favorites-side-header')).toBeInTheDocument();
      expect(getByTestId('favorites-side-item-img')).toBeInTheDocument();
      expect(getByTestId('favorites-side-item-name')).toBeInTheDocument();
      expect(getByTestId('favorites-side-item-age')).toBeInTheDocument();
      expect(
        getByTestId('favorites-side-item-availability')
      ).toBeInTheDocument();
      expect(getByTestId('favorites-side-item-review-btn')).toBeInTheDocument();
      expect(getByTestId('favorites-side-item-remove-btn')).toBeInTheDocument();
    });
  });
});
