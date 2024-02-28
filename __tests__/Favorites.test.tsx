import React from 'react';
import '@testing-library/jest-dom'

import { render, fireEvent, waitFor } from '@testing-library/react';
import {expect, test} from '@jest/globals';
import AdoptAPaw from '../app/adopt_a_paw/page';


describe('AdoptAPaw component', () => {
  test('Add pet to favorites and check if it appears in Favorites popup', async () => {
    const { getByTestId, getAllByTestId } = render(<AdoptAPaw />);
    
    // Find the first card
    const addToFavoritesButtons = getAllByTestId('add-to-favorites-btn');
    const addToFavoritesButton = addToFavoritesButtons[0]; 
    const triggerFavoritesSideMenu = getByTestId('favorites-trigger-btn');


    // Click on the 'Add to Favorites' button
    fireEvent.click(addToFavoritesButton);
    fireEvent.click(triggerFavoritesSideMenu);
    

    // Wait for the Favorites popup to appear and check the cols
    await waitFor(() => {
        expect(getByTestId('favorites-side-header')).toBeInTheDocument();
        expect(getByTestId('favorites-side-item-img')).toBeInTheDocument();
        expect(getByTestId('favorites-side-item-name')).toBeInTheDocument();
        expect(getByTestId('favorites-side-item-age')).toBeInTheDocument();
        expect(getByTestId('favorites-side-item-availability')).toBeInTheDocument();
        expect(getByTestId('favorites-side-item-review-btn')).toBeInTheDocument();
        expect(getByTestId('favorites-side-item-remove-btn')).toBeInTheDocument();
    })    
  });
})
