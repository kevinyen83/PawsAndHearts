import { createSlice } from '@reduxjs/toolkit';
import { FavoritesState } from '../../../types/favorites-types';
import { PayloadAction } from '@reduxjs/toolkit';
import { Pet } from '../../../types/pet-types';

const initialState: FavoritesState = {
  favoritesItems: [],
  isFavoritesEmpty: true,
  lastId: 0,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoritesItems: (state, action: PayloadAction<Pet[]>) => {
      state.favoritesItems = action.payload;
    },
    setIsFavoritesEmpty: (state, action: PayloadAction<boolean>) => {
      state.isFavoritesEmpty = action.payload;
    },
    setLastId: (state, action: PayloadAction<number>) => {
      state.lastId = action.payload;
    },
  },
});

export const {
  setFavoritesItems,
  setIsFavoritesEmpty,
  setLastId,
} = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
