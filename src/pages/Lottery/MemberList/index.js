import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Progress from '@/components/Progress';
import { getMembers, getMembersCancelled } from '@/features/members';

const MemberList = () => {
  const dispatch = useDispatch();
  //const members = useSelector(state => state.members.sources);
  const loaded = useSelector(state => state.members.loaded);

  useEffect(() => {
    dispatch(getMembers());

    return () => dispatch(getMembersCancelled());
  }, [dispatch]);

  if (!loaded) {
    return <Progress />;
  }

  return <div>This is member list</div>;
};

export default MemberList;
