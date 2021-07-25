import { Box } from '@material-ui/core';
import { useFormik } from 'formik';
import { useState } from 'react'
import { validateName, validatePasswords, validateRegister } from '../../../../utils/validateAuth';
import { Input, InputStyled } from '../../../Input';
import { Caption } from '../../Caption'
import { SubmitButton } from '../../../SubmitBtn';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../../../redux/selectors';
import { compare } from '../../../../utils/compareObjectByValues';
import { useStyles } from './style';
import { resetPassword, updateProfileName } from '../../../../redux/actions/ProfileActions';

export const Personal = () => {
  const classes = useStyles();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const passwordsState = {
    password: '',
    newPassword: '',
  };

  const customFieldsState = {
    name: auth.user?.name,
  };

  // const accountState = {
  //   account: auth.user?.account,
  // };

  const fPasswords = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: passwordsState,
    validationSchema: validatePasswords(),
    onSubmit: ({ password, newPassword }) => {
      if (auth.accessToken) {
        dispatch(resetPassword(password, newPassword, auth.accessToken));
      }
    },
  });

  const fCustomFields = useFormik({
    validateOnChange: false,
    initialValues: customFieldsState,
    validationSchema: validateName(),
    onSubmit: values => {
      console.log('DSAFSAF')
      dispatch(updateProfileName(values.name, auth.accessToken));
      debugger;
    },
  });

  // const fAccount = useFormik({
  //   validateOnChange: false,
  //   initialValues: initialState,
  //   validationSchema: validateRegister(),
  //   onSubmit: values => {
  //     // dispatch(register(values))
  //   },
  // });

  const handleCancelUpdate = (handleCancellation: () => any) => {
    const conf = globalThis.confirm('Вы уверены, что хотите отменить все изменения?');
    if (conf) handleCancellation();
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <>
      <Caption title="Персональные" description="Customize view and extra actions" />
      <Box className={classes.formWrapper}>
        <form noValidate onSubmit={fCustomFields.handleSubmit}>

          <InputStyled title="Общие настройки" inputTitle="Имя">
            <Input className={classes.input} fullWidth={true} formik={fCustomFields} label="Name" autoFocus name="name" />
          </InputStyled>

          {/* <Box className={classes.inputWrapper}>
            <Typography color="textSecondary" variant="body1" className={classes.inputLabel}>Email</Typography>
            <Input className={classes.input} formik={formik} label="Email / Phone Number" name="account" />
          </Box> */}

          <Box display="flex" justifyContent="flex-end" pb={4} mt={2} mr={2}>
            <SubmitButton
              className={classes.button}
              color="default"
              fullWidth={false}
              title="Cancel"
              type="button"
              disabled={compare(customFieldsState, fCustomFields.values)}
              onClick={() => handleCancelUpdate(() => fCustomFields.setValues(customFieldsState))}
            />
            <SubmitButton
              className={classes.button}
              color="primary"
              fullWidth={false}
              disabled={compare(customFieldsState, fCustomFields.values)}
              title={"Update"}
            />
          </Box>
        </form>
        {auth.user?.loginType === 'email' &&
          <form noValidate onSubmit={fPasswords.handleSubmit} className={classes.formWrapper}>
            <InputStyled title="Password Change" inputTitle="Пароль">
              <Input
                formik={fPasswords}
                label="Старый пароль"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={classes.input}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                withPassword={true}
              />
            </InputStyled>

            <InputStyled inputTitle="Новый пароль">
              <Input
                formik={fPasswords}
                label="Новый пароль"
                name="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={classes.input}
                showPassword={showNewPassword}
                setShowPassword={setShowNewPassword}
                withPassword={true}
              />
            </InputStyled>

            <Box display="flex" justifyContent="flex-end" pb={4} mt={2} mr={2}>
              <SubmitButton
                className={classes.button}
                color="default"
                fullWidth={false}
                title={"Cancel"}
                disabled={compare(passwordsState, fPasswords.values)}
                onClick={() => handleCancelUpdate(() => fPasswords.setValues(passwordsState))}
              />
              <SubmitButton
                className={classes.button}
                color="primary"
                fullWidth={false}
                title={"Update"}
                disabled={compare(passwordsState, fPasswords.values)}
              />
            </Box>
          </form>}
      </Box>
    </>
  )
}
