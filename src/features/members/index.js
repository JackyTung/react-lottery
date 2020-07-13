import { ofType } from 'redux-observable';

import get from 'lodash/get';
import { of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { createSlice } from '@reduxjs/toolkit';

import * as backend from '@/apis/backend';

const initialState = { loaded: false, sources: [], luckyNumber: -1, page: 1, limit: 5, total: 0, hasMore: false };

const getRandomNumber = max => Math.floor(Math.random() * Math.floor(max));

const slice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    getMembers: () => {},
    getMembersFulfilled: (state, action) => {
      const { response, page, limit } = action.payload;
      state.sources = response.members;
      state.loaded = true;
      state.total = response.total;
      state.page = page;
      state.limit = limit;
      state.hasMore = response.members.length < response.total;
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
    const page = get(action, 'payload.page', get(state$, 'value.members.page'));
    const limit = get(action, 'payload.page', get(state$, 'value.members.limit'));
    return backend.getMembers({ page, limit }).pipe(
      map(response => getMembersFulfilled({ response: response.response, page, limit })),
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
