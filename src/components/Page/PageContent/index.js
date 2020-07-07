import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(createStyles(styles));

const PageTitle = ({ children }) => {
  const classes = useStyles();
  return <section className={classes.root}>{children}</section>;
};

export default PageTitle;
