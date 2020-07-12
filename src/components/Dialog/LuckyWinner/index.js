import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Button from '@/components/Button';

const styles = theme => ({
  dialog: {
    minHeight: 200,
    width: 400,
  },
});

const useStyles = makeStyles(createStyles(styles));

const LuckyWinner = ({ open, name = '', handleCancel }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      aria-labelledby="lucky-winner-dialog"
      aria-describedby="lucky-winner-description"
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle id="no-dataset-title" disableTypography>
        <Typography variant="h5">The winner is.....</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText variant="body1">{name}, congratulations!</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LuckyWinner;
