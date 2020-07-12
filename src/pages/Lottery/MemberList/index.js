import React from 'react';
import { useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export const getLetterAvatar = name => name && name.substring(0, 2).toUpperCase();

const styles = theme => ({
  list: {
    width: 300,
    maxHeight: 500,
    overflowY: 'scroll',
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
  const members = useSelector(state => state.members.sources);

  return (
    <div>
      <Typography variant="h5">Member List</Typography>
      <List className={classes.list}>
        {members.map(member => (
          <ListItem key={member._id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>{getLetterAvatar(member.name)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={member.name} secondary={member.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MemberList;
