import { createSlice } from '@reduxjs/toolkit';
import { ImageFileState } from '../../../types/imageFile-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: ImageFileState = {
  imageFile: null,
};

export const imageFileSlice = createSlice({
  name: 'imageFile',
  initialState,
  reducers: {
    setImageFile: (state, action: PayloadAction<File>) => {
      state.imageFile = action.payload;
    },
  },
});

export const { setImageFile } = imageFileSlice.actions;
export const imageFileReducer = imageFileSlice.reducer;
