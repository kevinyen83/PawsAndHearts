import { createSlice } from '@reduxjs/toolkit';
import { PricesState, Price } from '../../../types/prices-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: PricesState = {
  prices: [],
};

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setPrices: (state, action: PayloadAction<Price[]>) => {
      state.prices = action.payload;
    },
  },
});

export const { setPrices } = pricesSlice.actions;
export const pricesReducer = pricesSlice.reducer;
