import { combineReducers } from 'redux';

import participants from '@/features/participants';
import timer from '@/features/timer';

export default combineReducers({
  participants,
  timer,
});
