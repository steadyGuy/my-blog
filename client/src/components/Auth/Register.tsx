import React, { useState } from 'react';
import { makeStyles, InputAdornment, IconButton } from '@material-ui/core'
import { useFormik } from 'formik';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { validateRegister } from '../../utils/validateAuth';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/AuthActions';
import { SubmitButton, Input } from './components';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
}));

export const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: '',
      account: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: validateRegister(),
    onSubmit: values => {
      dispatch(register(values))
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={classes.form}>
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
  )
}
