import { Avatar as MuiAvatar, Box, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors';
import { Caption } from './Caption';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => ({
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  avatar: {
    marginTop: theme.spacing(4),
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    border: `solid ${theme.spacing(1.25)}px ${theme.palette.grey[200]}`,
    transition: 'all 0.3s ease-in-out',
    '& img': {
      objectFit: 'fill',
    }
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    borderRadius: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: theme.spacing(4) + 10, // 10px is the border height and spacing is a marginTop 
    opacity: 0,
    cursor: 'pointer',
    zIndex: 1,
    '&:hover': {
      '& + .MuiAvatar-root': {
        opacity: 0.5,
        borderColor: deepPurple[500],
      },
      '& ~ .MuiSvgIcon-root': {
        opacity: 1,
      }
    },
  },
  uploadIcon: {
    position: 'absolute',
    transition: 'all 0.3s ease-in-out',
    fontSize: theme.spacing(5),
    // theme.spacing(3)-marginTop, +10 -border, theme.spacing(14) / 2 - the half size of
    // image and theme.spacing(5) / 2 the half size of icon => CENTER
    top: theme.spacing(3) + 10 + theme.spacing(14) / 2 - theme.spacing(5) / 2,
    color: theme.palette.primary.main,
    opacity: 0,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: '100%',
  },
}));

export const Avatar = () => {
  const classes = useStyles();
  const [avatar, setAvatar] = useState<string>('');
  const auth = useSelector(selectAuth);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const file = files[0];
      if (avatar) URL.revokeObjectURL(avatar);
      setAvatar(URL.createObjectURL(file));
    }

    console.log(files)
  }

  return (
    <>
      <Caption title="My profile picture" description="Add a photo of you to be easily recognized" />
      <form>
        <Box pb={7} className={classes.wrapper}>
          <input
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <MuiAvatar
            alt={`${auth?.user?.name[0].toUpperCase()}${auth?.user?.name}`}
            src={avatar ? avatar : auth?.user?.avatar}
            className={clsx(classes.large, classes.avatar)}
          />
          <CloudUploadIcon className={classes.uploadIcon} />
        </Box>
      </form>
    </>
  )
}
