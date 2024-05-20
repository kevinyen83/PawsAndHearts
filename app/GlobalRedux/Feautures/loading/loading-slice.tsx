import { createSlice } from '@reduxjs/toolkit';
import { LoadingState } from '../../../../types/loading-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: LoadingState = {
  isLoading: true,
};

export const loadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;
export const isLoadingReducer = loadingSlice.reducer;
