import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/AuthActions';
import { Input } from '../Input';
import { SubmitButton } from '../SubmitBtn';
import { validateLogin } from '../../utils/validateAuth';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
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
      loginType: 'email',
    },
    validationSchema: validateLogin(),
    onSubmit: values => {
      dispatch(login(values))
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={classes.form}>
      <Input formik={formik} label="Email / Phone Number" autoFocus name="account" />
      <Input
        formik={formik}
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        withPassword={true}
      />
      <SubmitButton className={classes.submit} title={"Sign In"} />
    </form>
  )
}
