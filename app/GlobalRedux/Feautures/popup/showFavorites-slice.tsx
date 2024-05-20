import { createSlice } from '@reduxjs/toolkit';
import { FavoritesPopupState } from '../../../../types/popup-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: FavoritesPopupState = {
  showFavorites: false,
};

export const showFavoritesSlice = createSlice({
  name: 'showFavorites',
  initialState,
  reducers: {
    setShowFavorites: (state, action: PayloadAction<boolean>) => {
      state.showFavorites = action.payload;
    },
  },
});

export const { setShowFavorites } = showFavoritesSlice.actions;
export const showFavoritesReducer = showFavoritesSlice.reducer;
