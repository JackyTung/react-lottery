import isEmpty from 'lodash/isEmpty';
import { createSelector } from 'reselect';

const getMembers = state => state.members.sources;
const getLuckyNumber = state => state.members.luckyNumber;

export const selectLuckyWinner = createSelector([getMembers, getLuckyNumber], (members, luckyNumber) => {
  if (luckyNumber <= -1 || isEmpty(members)) {
    return {};
  }

  return members[luckyNumber];
});
