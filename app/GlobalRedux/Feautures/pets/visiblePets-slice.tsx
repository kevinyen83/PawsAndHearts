import { createSlice } from '@reduxjs/toolkit';
import { VisiblePetsState } from '../../../../types/pet-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: VisiblePetsState = {
  visiblePets: 12,
};

export const visiblePetsSlice = createSlice({
  name: 'visiblePets',
  initialState,
  reducers: {
    setVisiblePets: (state, action: PayloadAction<number>) => {
      state.visiblePets = action.payload;
    },
  },
});

export const { setVisiblePets } = visiblePetsSlice.actions;
export const visiblePetsReducer = visiblePetsSlice.reducer;
