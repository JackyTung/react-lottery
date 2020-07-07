import React from 'react';

import classnames from 'classnames';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(createStyles(styles));

const Page = ({ children }) => {
  const classes = useStyles();
  return (
    <main id="page" className={classnames(classes.root)}>
      {children}
    </main>
  );
};

export default Page;
