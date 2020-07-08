import { combineEpics } from 'redux-observable';

import * as participants from '@/features/participants';
import * as timer from '@/features/timer';
import { getEpicsFromSlices } from '@/utils/redux.js';

export default combineEpics(...getEpicsFromSlices([participants, timer]));
