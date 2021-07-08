import { makeStyles, } from '@material-ui/core'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginSMSStart } from '../../redux/actions/AuthActions';
import { selectAuthDialogState } from '../../redux/selectors';
import { loginSchemaPhone } from '../../utils/validateAuth';
import { PromptDialog } from '../global/PromptDialog';
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

export const SignInSMS = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpen = useSelector(selectAuthDialogState);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      phone: '',
      loginType: 'number',
    },
    validationSchema: loginSchemaPhone(),
    onSubmit: values => {
      dispatch(loginSMSStart(values.phone));
    },
  });
  return (
    <>
      {isOpen && <PromptDialog phone={formik.values.phone} open={isOpen} />}
      <form noValidate onSubmit={formik.handleSubmit} className={classes.form}>
        <Input formik={formik} type="tel" label="Phone number" autoFocus name="phone" placeholder="0991112233" />
        <SubmitButton className={classes.submit} title={"Sign In"} />
      </form>
    </>
  );
}
