import { createSlice } from '@reduxjs/toolkit';
import { PopupState } from '../../../types/popup-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: PopupState = {
  showForm: false,
  showFavorites: false,
  showPetDetail: false,
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setShowForm: (state, action: PayloadAction<boolean>) => {
      state.showForm = action.payload;
    },
    setShowFavorites: (state, action: PayloadAction<boolean>) => {
      state.showFavorites = action.payload;
    },
    setShowPetDetail: (state, action: PayloadAction<boolean>) => {
      state.showPetDetail = action.payload;
    },
  },
});

export const {
  setShowForm,
  setShowFavorites,
  setShowPetDetail,
} = popupSlice.actions;
export const popupReducer = popupSlice.reducer;
