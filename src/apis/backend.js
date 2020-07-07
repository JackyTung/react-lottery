import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const getParticipants = () =>
  of({
    response: {
      participants: [{ name: 'user1' }],
    },
  }).pipe(delay(1500));
