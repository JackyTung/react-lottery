import { combineReducers } from 'redux';

import lottery from '@/features/lottery';
import members from '@/features/members';
import timer from '@/features/timer';

export default combineReducers({
  members,
  timer,
  lottery,
});
