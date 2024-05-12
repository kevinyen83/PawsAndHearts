import { createSlice } from '@reduxjs/toolkit';
import { CategoryState } from '../../../../types/category-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: CategoryState = {
  categoryState: 'All',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryState: (state, action: PayloadAction<string>) => {
      state.categoryState = action.payload;
    },
  },
});

export const { setCategoryState } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;