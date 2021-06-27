
import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4A90E4',
      light: '#78B1F5',
      dark: '#205EA6'
    },
    secondary: {
      main: '#171717',
      light: '#232323'
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#232323',
    }
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});

export default theme;