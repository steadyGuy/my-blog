import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: theme.spacing(20),
    '&:last-child': {
      marginLeft: theme.spacing(3),
    }
  },
  formWrapper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    '& form': {
      width: '100%',
    },
  },
  input: {
    marginRight: theme.spacing(4),
  },
}));