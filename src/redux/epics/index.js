import { combineEpics } from 'redux-observable';

import * as lottery from '@/features/lottery';
import * as members from '@/features/members';
import * as timer from '@/features/timer';
import { getEpicsFromSlices } from '@/utils/redux.js';

export default combineEpics(...getEpicsFromSlices([members, timer, lottery]));
