import display from './display';
import flex from './flex';
import position from './position';
import sizing from './sizing';
import text from './text';

export default () => ({
  '@global': {
    html: {
      height: '100%',
      overflow: 'hidden',
    },
    body: {
      height: '100%',
      fontFamily: 'Roboto, Noto Sans TC, sans-serif',
      '-webkit-font-smoothing': 'antialiased',
    },
    '#root': {
      height: '100%',
    },
    'h1, h2, h3, h4, h5, h6, p': {
      margin: 0,
      padding: 0,
    },
    a: {
      display: 'inline-block',
      textDecoration: 'none',
      color: 'inherit',
    },
    button: {
      outline: 'none',
      border: 'none',
    },
    ...display,
    ...flex,
    ...position,
    ...sizing,
    ...text,
  },
});
