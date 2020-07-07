import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, isRunning: false };

const slice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    updateCounter: (state, action) => {
      const { counter } = action.payload;
      state.counter = counter;
    },
    startCounter: (state, action) => {
      state.isRunning = true;
    },
    resetCounter: () => initialState,
  },
});

export const { updateCounter, startCounter, resetCounter } = slice.actions;

export default slice.reducer;
