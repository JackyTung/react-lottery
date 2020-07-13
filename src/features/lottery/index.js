import { ofType } from 'redux-observable';

import { of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { createSlice } from '@reduxjs/toolkit';

import * as backend from '@/apis/backend';
const initialState = { name: '', email: '' };

const getRandomNumber = max => Math.floor(Math.random() * Math.floor(max));

const slice = createSlice({
  name: 'lottery',
  initialState,
  reducers: {
    getLuckyMember: () => {},
    getLuckyMemberFulfilled: (state, action) => {
      const { member } = action.payload;
      state.name = member.name;
      state.email = member.email;
    },
    getLuckyMemberRejected: () => {},
    getLuckyMemberCancelled: () => initialState,
  },
});

export const epics = {
  getLuckyMember: (action$, state$, action) => {
    const total = state$.value.members.total;
    const number = getRandomNumber(total);
    return backend.getLuckyMember({ number }).pipe(
      map(response => getLuckyMemberFulfilled(response)),
      takeUntil(action$.pipe(ofType(getLuckyMemberCancelled.type))),
      catchError(error => of(getLuckyMemberRejected(error))),
    );
  },
};

export const {
  getLuckyMember,
  getLuckyMemberFulfilled,
  getLuckyMemberRejected,
  getLuckyMemberCancelled,
} = slice.actions;

export default slice.reducer;
