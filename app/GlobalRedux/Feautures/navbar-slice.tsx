import { createSlice } from '@reduxjs/toolkit';
import { NavbarState } from '../../../types/navbar-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: NavbarState = {
  userEmail: '',
  showDropdown: false,
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setShowDropdown: (state, action: PayloadAction<boolean>) => {
      state.showDropdown = action.payload;
    },
  },
});

export const { setUserEmail, setShowDropdown } = navbarSlice.actions;
export const navbarReducer = navbarSlice.reducer;
