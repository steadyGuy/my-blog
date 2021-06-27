import React, { useState } from 'react';
import { Button, makeStyles, InputAdornment, IconButton, TextField } from '@material-ui/core'
import { useFormik } from 'formik';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { validateLogin } from '../../utils/validateLogin';

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
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateLogin(),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form noValidate onSubmit={formik.handleSubmit} className={classes.form}>
      <TextField
        error={!!formik.errors.email && !!formik.touched.email}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        autoFocus
        helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
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
