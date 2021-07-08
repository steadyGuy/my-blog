import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& form': {
      width: '100%',
    },
  },
  headerLine: {
    margin: `${theme.spacing(2)}px 0`,
    width: '100%',
    height: '2px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[200],
    position: 'relative',
    '& p': {
      position: 'absolute',
      backgroundColor: '#fff',
      color: theme.palette.grey[500],
      padding: `0 ${theme.spacing(2.5)}px`,
      top: -theme.typography.fontSize / 2 - 2, // where - 2 is the size of headerLine (2px)
    }
  },
  button: {
    width: theme.spacing(20),
    '&:last-child': {
      marginLeft: theme.spacing(3),
    }
  },
  inputLabel: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    width: '25%',
  },
  input: {
    marginRight: theme.spacing(4),
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2),
  }
}));