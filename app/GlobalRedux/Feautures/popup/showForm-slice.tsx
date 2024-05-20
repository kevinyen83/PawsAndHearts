import { createSlice } from '@reduxjs/toolkit';
import { FormPopupState } from '../../../../types/popup-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: FormPopupState = {
  showForm: false,
};

export const showFormSlice = createSlice({
  name: 'showForm',
  initialState,
  reducers: {
    setShowForm: (state, action: PayloadAction<boolean>) => {
      state.showForm = action.payload;
    },
  },
});

export const { setShowForm } = showFormSlice.actions;
export const showFormReducer = showFormSlice.reducer;
