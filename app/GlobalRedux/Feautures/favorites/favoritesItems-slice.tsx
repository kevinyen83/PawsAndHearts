import { createSlice } from '@reduxjs/toolkit';
import { FavoritesItemsState } from '../../../../types/favorites-types';
import { PayloadAction } from '@reduxjs/toolkit';
import { Pet } from '../../../../types/pet-types';

const initialState: FavoritesItemsState = {
  favoritesItems: [],
};

export const favoritesItemsSlice = createSlice({
  name: 'favoritesItems',
  initialState,
  reducers: {
    setFavoritesItems: (state, action: PayloadAction<Pet[]>) => {
      state.favoritesItems = action.payload;
    },
  },
});

export const { setFavoritesItems } = favoritesItemsSlice.actions;
export const favoritesItemsReducer = favoritesItemsSlice.reducer;
