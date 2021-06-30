import { makeStyles, } from '@material-ui/core'
import { useFormik } from 'formik';
import { validateLogin } from '../../utils/validateAuth';
import { SubmitButton, Input } from './components';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
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
      <Input formik={formik} type="tel" label="Phone number" autoFocus name="phone" />
      <SubmitButton title={"Sign In"} />
    </form>
  )
}
