import { concat, empty, iif, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { createSlice } from '@reduxjs/toolkit';

import { getLuckyMember } from '@/features/lottery';

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
    stopCounter: (state, action) => {
      state.isRunning = false;
    },
    resetCounter: () => initialState,
  },
});

export const epics = {
  updateCountDownCounter: (action$, state$, action) => {
    const newCounter = state$.value.timer.counter - 1;
    return concat(
      of(updateCountDownCounterFulfilled({ counter: newCounter })).pipe(delay(1000)),
      iif(() => newCounter === 0, of(stopCounter(), getLuckyMember()), empty()),
    );
  },
};

export const {
  setCounter,
  updateCountDownCounter,
  updateCountDownCounterFulfilled,
  startCounter,
  stopCounter,
  resetCounter,
} = slice.actions;

export default slice.reducer;
