import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Progress from '@/components/Progress';
import { getMembers, getMembersCancelled } from '@/features/members';

export const getLetterAvatar = name => name && name.substring(0, 2).toUpperCase();

const styles = theme => ({
  list: {
    width: 300,
    maxHeight: 500,
    overflowY: 'scroll',
    border: '1px solid red',
  },
  text: {
    color: 'black',
  },
});

const useStyles = makeStyles(createStyles(styles));

const MemberList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const members = useSelector(state => state.members.sources);
  const loaded = useSelector(state => state.members.loaded);

  useEffect(() => {
    dispatch(getMembers());

    return () => dispatch(getMembersCancelled());
  }, [dispatch]);

  if (!loaded) {
    return <Progress />;
  }

  return (
    <List className={classes.list}>
      {members.map(member => (
        <ListItem key={member._id}>
          <ListItemAvatar>
            <Avatar>{getLetterAvatar(member.name)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={member.name} secondary={member.email} />
        </ListItem>
      ))}
    </List>
  );
};

export default MemberList;
