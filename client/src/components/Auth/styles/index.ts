import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    marginBottom: theme.spacing(1)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  account: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
}));