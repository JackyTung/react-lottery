import { ofType } from 'redux-observable';

import update from 'immutability-helper';
import { of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { createSlice } from '@reduxjs/toolkit';

import * as backend from '@/apis/backend';

const initialState = { loaded: false, sources: [] };

const slice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    getParticipants: () => {},
    getParticipantsFulfilled: (state, action) => {
      const { response } = action.payload;
      return update(state, {
        sources: {
          $set: response.participants,
        },
        loaded: true,
      });
    },
    getParticipantsRejected: (state, action) => state,
    getParticipantsCancelled: () => initialState,
  },
});

export const epics = {
  getParticipants: (action$, state$, action) => {
    return backend.getParticipants().pipe(
      map(response => getParticipantsFulfilled({ response })),
      takeUntil(action$.pipe(ofType(getParticipantsCancelled.type))),
      catchError(error => of(getParticipantsRejected(error))),
    );
  },
};

export const {
  getParticipants,
  getParticipantsFulfilled,
  getParticipantsRejected,
  getParticipantsCancelled,
} = slice.actions;

export default slice.reducer;
