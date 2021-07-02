
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
      // paper: 'green',
    },
    text: {
      primary: '#232323',
    }
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
        textTransform: 'none',
      },
    },
    MuiAppBar: {
      colorDefault: {
        // backgroundColor: '#fff',
      }
    }
  },
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    h1: {
      fontWeight: 'bold',
      fontSize: 54,
    },
    h2: {
      fontWeight: 'bold',
      fontSize: 36,
    },
    h3: {
      fontWeight: 'bold',
      fontSize: 24,
    },
  },
});

export default theme;