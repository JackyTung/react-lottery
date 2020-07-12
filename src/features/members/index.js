import { ofType } from 'redux-observable';

import { of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { createSlice } from '@reduxjs/toolkit';

import * as backend from '@/apis/backend';

const initialState = { loaded: false, sources: [], luckyNumber: -1 };

const getRandomNumber = max => Math.floor(Math.random() * Math.floor(max));

const slice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    getMembers: () => {},
    getMembersFulfilled: (state, action) => {
      const { response } = action.payload;
      state.sources = response.members;
      state.loaded = true;
    },
    getMembersRejected: (state, action) => state,
    getMembersCancelled: () => initialState,
    getLuckyNumber: (state, action) => {
      const { sources } = state;
      const number = getRandomNumber(sources.length);
      state.luckyNumber = number;
    },
    resetLuckyNumber: (state, action) => {
      state.luckyNumber = -1;
    },
  },
});

export const epics = {
  getMembers: (action$, state$, action) => {
    return backend.getMembers().pipe(
      map(response => getMembersFulfilled(response)),
      takeUntil(action$.pipe(ofType(getMembersCancelled.type))),
      catchError(error => of(getMembersRejected(error))),
    );
  },
};

export const {
  getMembers,
  getMembersFulfilled,
  getMembersRejected,
  getMembersCancelled,
  getLuckyNumber,
  resetLuckyNumber,
} = slice.actions;

export default slice.reducer;
