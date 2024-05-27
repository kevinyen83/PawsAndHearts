import { createSlice } from '@reduxjs/toolkit';
import { Coordinates, MapState } from '../../../types/map-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: MapState = {
  mapLocation: '',
  coordinates: null,
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapLocation: (state, action: PayloadAction<string>) => {
      state.mapLocation = action.payload;
    },
    setCoordinates: (state, action: PayloadAction<Coordinates>) => {
      state.coordinates = action.payload;
    },
  },
});

export const { setMapLocation, setCoordinates } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
