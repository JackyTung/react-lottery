import { ofType } from 'redux-observable';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { createSlice } from '@reduxjs/toolkit';

const initialState = { counter: 0, isRunning: false };

const slice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setCounter: (state, action) => {
      const { counter } = action.payload;
      state.counter = counter;
    },
    updateCountDownCounter: (state, action) => {},
    updateCountDownCounterFulfilled: (state, action) => {
      const { counter } = action.payload;
      state.counter = counter;
    },
    startCounter: (state, action) => {
      state.isRunning = true;
    },
    resetCounter: () => initialState,
  },
});

export const epics = {
  updateCountDownCounter: (action$, state$, action) => {
    const counter = state$.value.timer.counter;
    return of(updateCountDownCounterFulfilled({ counter: counter - 1 })).delay(1000);
  },
};

export const {
  setCounter,
  updateCountDownCounter,
  updateCountDownCounterFulfilled,
  startCounter,
  resetCounter,
} = slice.actions;

export default slice.reducer;
