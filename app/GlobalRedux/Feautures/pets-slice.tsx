import { createSlice } from '@reduxjs/toolkit';
import { Pet, PetsState } from '../../../types/pet-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: PetsState = {
  pets: [],
  formSelectedPet: null,
  selectedPet: null,
  visiblePets: 12,
};

export const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setPetsState: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload;
    },
    setFormSelectedPet: (state, action: PayloadAction<Pet>) => {
      state.formSelectedPet = action.payload;
    },
    setSelectedPet: (state, action: PayloadAction<Pet>) => {
      state.selectedPet = action.payload;
    },
    setVisiblePets: (state, action: PayloadAction<number>) => {
      state.visiblePets = action.payload;
    },
  },
});

export const {
  setPetsState,
  setFormSelectedPet,
  setSelectedPet,
  setVisiblePets,
} = petsSlice.actions;
export const petsReducer = petsSlice.reducer;
