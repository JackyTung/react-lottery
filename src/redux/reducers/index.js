import { combineReducers } from 'redux';

import members from '@/features/members';
import timer from '@/features/timer';

export default combineReducers({
  members,
  timer,
});
