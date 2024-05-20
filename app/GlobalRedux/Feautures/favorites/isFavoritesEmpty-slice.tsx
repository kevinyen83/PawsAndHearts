import { createSlice } from '@reduxjs/toolkit';
import { IsFavoritesEmptyState } from '../../../../types/favorites-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: IsFavoritesEmptyState = {
  isFavoritesEmpty: true,
};

export const isFavoritesEmptySlice = createSlice({
  name: 'isFavoritesEmpty',
  initialState,
  reducers: {
    setIsFavoritesEmpty: (state, action: PayloadAction<boolean>) => {
      state.isFavoritesEmpty = action.payload;
    },
  },
});

export const { setIsFavoritesEmpty } = isFavoritesEmptySlice.actions;
export const isFavoritesEmptyReducer = isFavoritesEmptySlice.reducer;
