import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    saveBtn: {
      color: '#fff',
    },
    form: {
      marginTop: theme.spacing(1),
      padding: 25,
    },
    submit: {
      margin: theme.spacing(1, 0, 1),
    },
  }),
);