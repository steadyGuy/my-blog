import { useState } from 'react';
import { makeStyles } from '@material-ui/core'
import { useFormik } from 'formik';
import { validateRegister } from '../../utils/validateAuth';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/AuthActions';
import { Input } from '../Input';
import { SubmitButton } from '../SubmitBtn';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
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
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        withPassword={true}
      />
      <Input
        formik={formik}
        label="Confirm password"
        name="passwordConfirm"
        type={showPasswordConfirm ? 'text' : 'password'}
        autoComplete="current-password"
        showPassword={showPasswordConfirm}
        setShowPassword={setShowPasswordConfirm}
        withPassword={true}
      />
      <SubmitButton className={classes.submit} title={"Sign Up"} />
    </form>
  );
}
