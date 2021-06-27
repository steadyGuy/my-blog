import React, { useState } from 'react';
import { Button, makeStyles, InputAdornment, IconButton, TextField } from '@material-ui/core'
import { useFormik } from 'formik';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { validateLogin } from '../../utils/validateLogin';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/AuthActions';

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
    },
    validationSchema: validateLogin(),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      dispatch(login(formik.values))
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={classes.form}>
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
      <Button
        type="submit"
        className={classes.submit}
        fullWidth
        size="large"
        variant="contained"
        color="primary"
      >
        Sign In
      </Button>
    </form>
  )
}
