import { Box, CircularProgress, fade, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles(({ palette }: Theme) => ({
  page: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: fade('#fff', 1),
    zIndex: 1000,
  },
}));

export const Loader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.page} >
      <CircularProgress color="primary" size={54} />
    </Box>
  )
}
