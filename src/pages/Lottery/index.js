import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import addSeconds from 'date-fns/addSeconds';
import format from 'date-fns/format';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Page from '@/components/Page';
import PageContent from '@/components/Page/PageContent';
import PageTitle from '@/components/Page/PageTitle';
import Progress from '@/components/Progress';
import { getMembers, getMembersCancelled } from '@/features/members';
import { setCounter, startCounter, stopCounter, updateCountDownCounter } from '@/features/timer';
import MemberList from './MemberList';

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
    return <div>00:00</div>;
  }
  return <div>{formattedTime(counter)}</div>;
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
    <>
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
      {isRunning ? (
        <Button variant="contained" color="primary" onClick={handleStop}>
          stop
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleStart}>
          start
        </Button>
      )}
    </>
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
  useEffect(() => {
    dispatch(getMembers());

    return () => dispatch(getMembersCancelled());
  }, [dispatch]);

  return (
    <Page>
      <PageTitle title="Welcome to Lottery page" />
      <PageContent>
        {!loaded ? (
          <Progress />
        ) : (
          <div className="d-flex justify-space-around">
            <CountDownTimer />
            <MemberList />
          </div>
        )}
      </PageContent>
    </Page>
  );
};

export default Lottery;
