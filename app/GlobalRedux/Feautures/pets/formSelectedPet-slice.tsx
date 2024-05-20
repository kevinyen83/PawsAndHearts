import { createSlice } from '@reduxjs/toolkit';
import { Pet, FormSelectedPetState } from '../../../../types/pet-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: FormSelectedPetState = {
  formSelectedPet: null,
};

export const formSelectedPetSlice = createSlice({
  name: 'formSelectedPet',
  initialState,
  reducers: {
    setFormSelectedPet: (state, action: PayloadAction<Pet>) => {
      state.formSelectedPet = action.payload;
    },
  },
});

export const { setFormSelectedPet } = formSelectedPetSlice.actions;
export const formSelectedPetReducer = formSelectedPetSlice.reducer;
