import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Progress from '@/components/Progress';
import { getMembers } from '@/features/members';

export const getLetterAvatar = name => name && name.substring(0, 2).toUpperCase();

const styles = theme => ({
  list: {
    width: 300,
    height: 370,
    overflowY: 'auto',
    border: `1px solid ${theme.palette.border.main}`,
    backgroundColor: theme.palette.button.main,
  },
  text: {
    color: 'black',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
});

const useStyles = makeStyles(createStyles(styles));

const MemberList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const members = useSelector(state => state.members.sources);
  const page = useSelector(state => state.members.page);
  const hasMore = useSelector(state => state.members.hasMore);

  const handleNext = () => dispatch(getMembers({ page: page + 1 }));

  return (
    <div>
      <Typography variant="h5">Member List</Typography>
      <List id="mList" className={classes.list}>
        <InfiniteScroll
          dataLength={members.length}
          hasMore={hasMore}
          next={handleNext}
          loader={<Progress height={135} />}
          scrollableTarget="mList"
        >
          {members.map(member => (
            <ListItem key={member._id}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>{getLetterAvatar(member.name)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={member.name} secondary={member.email} />
            </ListItem>
          ))}
        </InfiniteScroll>
      </List>
    </div>
  );
};

export default MemberList;
