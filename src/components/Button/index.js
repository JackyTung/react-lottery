import React from 'react';

import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    borderRadius: 20,
    border: `1px solid ${theme.palette.primary.main}`,
    color: 'white',
    minWidth: 90,
    height: 40,
    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: 'white',
    },
  },
});

const useStyles = makeStyles(createStyles(styles));

const EnhancedButton = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <Button variant="contained" color="primary" className={classes.button} disableElevation {...props}>
      {children}
    </Button>
  );
};

export default EnhancedButton;
