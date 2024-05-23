import { createSlice } from '@reduxjs/toolkit';
import { FormState } from '../../../types/form-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: FormState = {
  inputUserEmail: '',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setInputUserEmail: (state, action: PayloadAction<string>) => {
      state.inputUserEmail = action.payload;
    },
  },
});

export const { setInputUserEmail } = formSlice.actions;
export const formReducer = formSlice.reducer;
