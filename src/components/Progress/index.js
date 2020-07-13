import React from 'react';

import classNames from 'classnames';

import CircularProgress from '@material-ui/core/CircularProgress';

const Progress = ({ message, height }) => (
  <div className={classNames('d-flex flex-column justify-center align-center vh-100')}>
    <div style={{ height }}>
      <CircularProgress />
    </div>
    {message && (
      <>
        <br />
        <p>{message}</p>
      </>
    )}
  </div>
);

export default Progress;
