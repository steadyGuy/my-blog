import React, { useState } from 'react';
import { Button, makeStyles, InputAdornment, IconButton, TextField } from '@material-ui/core'
import { useFormik } from 'formik';
import { validateLogin } from '../../utils/validateLogin';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

export const SignInSMS = () => {
  const classes = useStyles();
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      phone: '',
    },
    validationSchema: validateLogin(),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form noValidate onSubmit={formik.handleSubmit} className={classes.form}>
      <TextField
        error={!!formik.errors.phone && !!formik.touched.phone}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="phone"
        label="Phone number"
        onBlur={formik.handleBlur}
        type='tel'
        id="phone"
        autoComplete="current-password"
        helperText={formik.touched.phone && formik.errors.phone ? formik.errors.phone : null}
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
