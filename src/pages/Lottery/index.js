import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import addSeconds from 'date-fns/addSeconds';
import format from 'date-fns/format';
import isEmpty from 'lodash/isEmpty';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Button from '@/components/Button';
import LuckyWinnerDialog from '@/components/Dialog/LuckyWinner';
import Page from '@/components/Page';
import PageContent from '@/components/Page/PageContent';
import PageTitle from '@/components/Page/PageTitle';
import Progress from '@/components/Progress';
import { getMembers, getMembersCancelled, resetLuckyNumber } from '@/features/members';
import { setCounter, startCounter, stopCounter, updateCountDownCounter } from '@/features/timer';
import MemberList from './MemberList';
import { selectLuckyWinner } from './selectors';

const formattedTime = seconds => {
  const helperDate = addSeconds(new Date(0), seconds);
  // TODO: handle second > 3600
  return format(helperDate, 'mm:ss');
};

const DisplayTimer = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.timer.counter);
  const isRunning = useSelector(state => state.timer.isRunning);

  useEffect(() => {
    if (counter > 0 && isRunning) {
      dispatch(updateCountDownCounter());
    }
  }, [counter, isRunning, dispatch]);

  if (counter <= 0) {
    return (
      <Typography variant="h1" color="textPrimary">
        00:00
      </Typography>
    );
  }
  return (
    <Typography variant="h1" color="textPrimary">
      {formattedTime(counter)}
    </Typography>
  );
};

const InputTimer = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const isRunning = useSelector(state => state.timer.isRunning);

  const handleStart = () => {
    if (value <= 0) {
      return setErrorMsg('* 請輸入大於0的數字');
    }

    dispatch(setCounter({ counter: value }));
    dispatch(startCounter());
    setValue('');
  };

  const handleStop = () => dispatch(stopCounter());

  const handleOnChange = e => {
    const value = e.target.value;
    if (value < 0) {
      return setErrorMsg('* 請輸入大於0的數字');
    }
    setErrorMsg('');
    return setValue(value);
  };

  return (
    <div className="d-flex">
      <div style={{ marginRight: 8 }}>
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          value={value}
          onChange={handleOnChange}
          helperText={errorMsg}
          error={!!errorMsg}
        />
      </div>
      <div style={{ marginTop: 8 }}>
        {isRunning ? <Button onClick={handleStop}>stop</Button> : <Button onClick={handleStart}>start</Button>}
      </div>
    </div>
  );
};

const CountDownTimer = () => {
  return (
    <div>
      <InputTimer />
      <DisplayTimer />
    </div>
  );
};

const Lottery = () => {
  const dispatch = useDispatch();
  const loaded = useSelector(state => state.members.loaded);
  const winner = useSelector(selectLuckyWinner);

  useEffect(() => {
    dispatch(getMembers());

    return () => dispatch(getMembersCancelled());
  }, [dispatch]);

  const handleCancel = () => dispatch(resetLuckyNumber());

  return (
    <Page>
      <PageTitle title="Welcome to Lottery page" />
      <PageContent>
        {!loaded ? (
          <Progress />
        ) : (
          <>
            <div className="d-flex justify-space-around">
              <CountDownTimer />
              <MemberList />
            </div>
            <LuckyWinnerDialog open={!isEmpty(winner)} handleCancel={handleCancel} name={winner.name} />
          </>
        )}
      </PageContent>
    </Page>
  );
};

export default Lottery;
