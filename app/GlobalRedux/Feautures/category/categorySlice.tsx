import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface CategoryState {
  categoryState: string;
}

const initialState: CategoryState = {
    categoryState: 'All',
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryState: (state, action: PayloadAction<string>) => {
      state.categoryState = action.payload;
    },
  },
});

export const { setCategoryState } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;