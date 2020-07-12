import React from 'react';
import { render } from 'react-dom';

import jss from 'jss';
import preset from 'jss-preset-default';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import theme from '@/constants/theme';
import App from './routes';
import * as serviceWorker from './serviceWorker';
import styles from './styles';

const muiTheme = createMuiTheme(theme);

// create global styles
jss.setup(preset());
jss.createStyleSheet(styles(), { meta: 'global' }).attach();

render(
  <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
