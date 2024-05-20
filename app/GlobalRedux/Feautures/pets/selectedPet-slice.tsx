import { createSlice } from '@reduxjs/toolkit';
import { Pet, SelectedPetState } from '../../../../types/pet-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: SelectedPetState = {
  selectedPet: null,
};

export const selectedPetSlice = createSlice({
  name: 'selectedPet',
  initialState,
  reducers: {
    setSelectedPet: (state, action: PayloadAction<Pet>) => {
      state.selectedPet = action.payload;
    },
  },
});

export const { setSelectedPet } = selectedPetSlice.actions;
export const selectedPetReducer = selectedPetSlice.reducer;
