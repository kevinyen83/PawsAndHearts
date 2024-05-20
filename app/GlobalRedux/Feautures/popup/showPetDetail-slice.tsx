import { createSlice } from '@reduxjs/toolkit';
import { PetDetailPopupState } from '../../../../types/popup-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: PetDetailPopupState = {
  showPetDetail: false,
};

export const showPetDetailSlice = createSlice({
  name: 'showPetDetail',
  initialState,
  reducers: {
    setShowPetDetail: (state, action: PayloadAction<boolean>) => {
      state.showPetDetail = action.payload;
    },
  },
});

export const { setShowPetDetail } = showPetDetailSlice.actions;
export const showPetDetailReducer = showPetDetailSlice.reducer;
