import { IconButton, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { validateRegister } from '../../../utils/validateAuth';
import { Input } from '../../Input';
import { Caption } from '../Caption'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { SubmitButton } from '../../SubmitBtn';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../redux/selectors';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    marginTop: theme.spacing(5),
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
  }
}));


export const Personal = () => {
  const classes = useStyles();
  const auth = useSelector(selectAuth);
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: auth.user?.name,
      account: auth.user?.account,
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validateRegister(),
    onSubmit: values => {
      // dispatch(register(values))
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Caption title="Персональные" description="Customize view and extra actions" />
      <form noValidate onSubmit={formik.handleSubmit} className={classes.form}>
        <div className={classes.headerLine}>
          <Typography variant="body2">General settings</Typography>
        </div>
        <Input formik={formik} label="Name" autoFocus name="name" />
        <Input formik={formik} label="Email / Phone Number" name="account" />
        <Input
          formik={formik}
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(prev => !prev)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />
        <Input
          formik={formik}
          label="Confirm password"
          name="passwordConfirm"
          type={showPasswordConfirm ? 'text' : 'password'}
          autoComplete="current-password"
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPasswordConfirm(prev => !prev)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />
        <SubmitButton title={"Sign Up"} />
      </form>
    </>
  )
}
