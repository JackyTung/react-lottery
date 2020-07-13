import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { members } from '@/constants/memberData';

export const getMembers = ({ page, limit }) => {
  return of({
    response: {
      members: members.slice(0, page * limit),
      total: members.length,
    },
  }).pipe(delay(1500));
};

export const getLuckyMember = ({ number }) =>
  of({
    member: members[number - 1],
  }).pipe(delay(1500));
