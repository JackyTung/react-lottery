import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const useStyles = makeStyles(createStyles(styles));

const PageTitle = ({ title = '' }) => {
  const classes = useStyles();
  return (
    <AppBar position="sticky" elevation={0} className={classes.root}>
      <Toolbar className="justify-center">
        <Typography variant="h6" className={classes.text}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default PageTitle;
