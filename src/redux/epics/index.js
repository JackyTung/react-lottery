import { combineEpics } from 'redux-observable';

import * as participants from '@/features/participants';
import { getEpicsFromSlices } from '@/utils/redux.js';

export default combineEpics(...getEpicsFromSlices([participants]));
