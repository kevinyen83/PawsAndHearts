import { createSlice } from '@reduxjs/toolkit';
import { Pet, PetsState } from '../../../../types/pet-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: PetsState = {
  pets: [],
};

export const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setPetsState: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload;
    },
  },
});

export const { setPetsState } = petsSlice.actions;
export const petsReducer = petsSlice.reducer;
