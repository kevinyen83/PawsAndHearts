import { createSlice } from '@reduxjs/toolkit';
import { MapState } from '../../../types/map-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: MapState = {
  mapLocation: '',
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapLocation: (state, action: PayloadAction<string>) => {
      state.mapLocation = action.payload;
    },
  },
});

export const { setMapLocation } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
