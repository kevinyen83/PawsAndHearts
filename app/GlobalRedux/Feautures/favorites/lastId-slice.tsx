import { createSlice } from '@reduxjs/toolkit';
import { LastIdState } from '../../../../types/favorites-types';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: LastIdState = {
  lastId: 0,
};

export const lastIdSlice = createSlice({
  name: 'lastId',
  initialState,
  reducers: {
    setLastId: (state, action: PayloadAction<number>) => {
      state.lastId = action.payload;
    },
  },
});

export const { setLastId } = lastIdSlice.actions;
export const lastIdReducer = lastIdSlice.reducer;
