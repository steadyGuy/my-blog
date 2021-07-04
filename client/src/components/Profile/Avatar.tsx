import { Avatar as MuiAvatar, Box, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx';
import { Caption } from './Caption'

const useStyles = makeStyles((theme: Theme) => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  avatar: {
    margin: '0 auto',
    marginTop: theme.spacing(4),
  },
  input: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    borderRadius: '100%',
    backgroundColor: 'green',
    position: 'absolute',
    top: 0,
    left: theme.spacing(12),
    opacity: 0,
    cursor: 'pointer',
  },
  wrapper: {
    position: 'relative',
  }
}));

export const Avatar = () => {
  const classes = useStyles();

  return (
    <>
      <Caption title="My profile picture" description="Add a photo of you to be easily recognized" />
      <Box pb={7} className={classes.wrapper}>
        <form>
          <MuiAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={clsx(classes.large, classes.avatar)} />
          <input
            accept="image/*"
            className={classes.input}
            // style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
        </form>
      </Box>
    </>
  )
}
