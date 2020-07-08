import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Page from '@/components/Page';
import PageContent from '@/components/Page/PageContent';
import PageTitle from '@/components/Page/PageTitle';
import { startCounter, updateCountDownCounter, setCounter } from '@/features/timer';

const INTERVAL_SECOND = 1;
const INTERVAL_MILLI_SECOND = INTERVAL_SECOND * 1000;

const DisplayTimer = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.timer.counter);
  const isRunning = useSelector(state => state.timer.isRunning);

  useEffect(() => {
    if (counter > 0 && isRunning) {
      dispatch(updateCountDownCounter());
    }
  }, [counter, isRunning]);

  return <div>Countdown: {counter || 0}</div>;
};

const InputTimer = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStart = () => {
    if (value <= 0) {
      return setErrorMsg('* 請輸入大於0的數字');
    }

    dispatch(setCounter({ counter: value }));
    dispatch(startCounter());
    setValue('');
  };

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
      <Button variant="contained" color="primary" onClick={handleStart}>
        start
      </Button>
    </>
  );
};

const CountDownTimer = () => {
  return (
    <>
      <InputTimer />
      <DisplayTimer />
    </>
  );
};

const Lottery = () => {
  return (
    <Page>
      <PageTitle title="Welcome to Lottery page" />
      <PageContent>
        <CountDownTimer />
      </PageContent>
    </Page>
  );
};

export default Lottery;
