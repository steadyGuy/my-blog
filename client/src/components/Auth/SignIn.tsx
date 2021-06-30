import React, { useState } from 'react';
import { makeStyles, InputAdornment, IconButton } from '@material-ui/core'
import { useFormik } from 'formik';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/AuthActions';
import { Loader } from '../Alert/Loader';
import { SubmitButton, Input } from './components';
import { validateLogin } from '../../utils/validateAuth';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
}));

export const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      account: '',
      password: '',
    },
    validationSchema: validateLogin(),
    onSubmit: values => {
      dispatch(login(values))
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={classes.form}>
      <Input formik={formik} label="Email / Phone Number" autoFocus name="account" />
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
      <SubmitButton title={"Sign In"} />
    </form>
  )
}
