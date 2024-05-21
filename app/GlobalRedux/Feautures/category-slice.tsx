import { createSlice } from '@reduxjs/toolkit';
import { CategoryState } from '../../../types/category-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: CategoryState = {
  category: 'All',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryState: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategoryState } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
