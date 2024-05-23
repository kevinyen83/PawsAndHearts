import { createSlice } from '@reduxjs/toolkit';
import { CarouselState, PetHighlight } from '../../../types/carousel-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: CarouselState = {
  petHighlight: [],
  startIndex: 0,
};

export const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    setPetHighlight: (state, action: PayloadAction<PetHighlight[]>) => {
      state.petHighlight = action.payload;
    },
    setStartIndex: (state, action: PayloadAction<number>) => {
      state.startIndex = action.payload;
    },
  },
});

export const { setPetHighlight, setStartIndex } = carouselSlice.actions;
export const carouselReducer = carouselSlice.reducer;
