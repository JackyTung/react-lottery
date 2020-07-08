import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { members } from '@/constants/memberData';

export const getMembers = () =>
  of({
    response: {
      members,
    },
  }).pipe(delay(1500));
