import React, { useState } from 'react';
import { makeStyles, InputAdornment, IconButton, TextField } from '@material-ui/core'
import { useFormik } from 'formik';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { validateLogin } from '../../utils/validateLogin';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/AuthActions';
import { Loader } from '../Notification/Loader';
import { Notification } from '../Notification';
import { selectAuthErrors, selectAuthLoadingState } from '../../redux/selectors';
import { AUTH_FAILURE } from '../../redux/constants/authType';
import { SubmitButton } from './components/SubmitBtn';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
}));

export const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoadingState);
  const errors = useSelector(selectAuthErrors);

  const handleCloseError = () => {
    dispatch({ type: AUTH_FAILURE, payload: null });
  }

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
      {isLoading && <Loader />}
      {errors &&
        <Notification
          handleClose={handleCloseError}
          errors={errors}
          severity="error"
        />}
      <TextField
        error={!!formik.errors.account && !!formik.touched.account}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="account"
        label="Email / Phone Number"
        name="account"
        autoComplete="account"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.account}
        autoFocus
        helperText={formik.touched.account && formik.errors.account ? formik.errors.account : null}
      />
      <TextField
        error={!!formik.errors.password && !!formik.touched.password}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : null}
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
      <SubmitButton title={"Sign Up"} />
    </form>
  )
}
