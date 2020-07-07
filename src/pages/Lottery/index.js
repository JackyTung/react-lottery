import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const INTERVAL_SECOND = 1;
const INTERVAL_MILLI_SECOND = INTERVAL_SECOND * 1000;

const CountDownTimer = () => {
  const [counter, setCounter] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const timer =
      counter > 0 && isRunning && setInterval(() => setCounter(counter - INTERVAL_SECOND), INTERVAL_MILLI_SECOND);

    if (counter === 0 && isRunning) {
      // TODO: dispatch getLottery Action
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [counter, isRunning]);

  const handleOnChange = e => {
    const value = e.target.value;
    if (value < 0) {
      return setErrorMsg('* 請輸入大於0的數字');
    }
    setErrorMsg('');
    return setCounter(value);
  };

  const handleStart = () => {
    if (counter <= 0) {
      return setErrorMsg('* 請輸入大於0的數字');
    }
    return setIsRunning(true);
  };

  // TODO: input text field, start button, stop button, reset button
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
        onChange={handleOnChange}
        helperText={errorMsg}
        error={!!errorMsg}
      />
      <div>Countdown: {counter || 0}</div>
      {isRunning ? (
        <Button variant="contained" color="primary">
          reset
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleStart}>
          start
        </Button>
      )}
    </>
  );
};

const Lottery = () => {
  return (
    <div>
      <CountDownTimer />
    </div>
  );
};

export default Lottery;
