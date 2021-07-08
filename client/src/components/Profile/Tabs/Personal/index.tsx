import { Box, IconButton, InputAdornment, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { validatePasswords, validateRegister } from '../../../../utils/validateAuth';
import { Input } from '../../../Input';
import { Caption } from '../../Caption'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { SubmitButton } from '../../../SubmitBtn';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../../../redux/selectors';
import { compare } from '../../../../utils/compareObjectByValues';
import { useStyles } from './style';
import { resetPassword } from '../../../../redux/actions/ProfileActions';

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

  const accountState = {
    account: auth.user?.account,
  };

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
    validationSchema: validateRegister(),
    onSubmit: values => {
      // dispatch(register(values))
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

  const handleCancelSavePasswords = () => {
    const conf = globalThis.confirm('Вы уверены, что хотите отменить все изменения?');
    conf && fPasswords.setValues(passwordsState);
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Caption title="Персональные" description="Customize view and extra actions" />
      <Box className={classes.formWrapper}>
        <form>
          <Box className={classes.headerLine}>
            <Typography variant="body2">General settings</Typography>
          </Box>
          <Box className={classes.inputWrapper}>
            <Typography color="textSecondary" variant="body1" className={classes.inputLabel}>Name</Typography>
            <Input className={classes.input} fullWidth={true} formik={fCustomFields} label="Name" autoFocus name="name" />
          </Box>

          {/* <Box className={classes.inputWrapper}>
            <Typography color="textSecondary" variant="body1" className={classes.inputLabel}>Email</Typography>
            <Input className={classes.input} formik={formik} label="Email / Phone Number" name="account" />
          </Box> */}

          <Box display="flex" justifyContent="flex-end" pb={4} mt={2} mr={2}>
            <SubmitButton
              className={classes.button}
              color="default"
              fullWidth={false}
              title={"Cancel"}
              disabled={compare(passwordsState, fPasswords.values)}
              onClick={handleCancelSavePasswords}
            />
            <SubmitButton
              className={classes.button}
              color="primary"
              fullWidth={false}
              title={"Update"}
              disabled={compare(passwordsState, fPasswords.values)}
            />
          </Box>
        </form>
        {auth.user?.loginType === 'email' &&
          <form noValidate onSubmit={fPasswords.handleSubmit} className={classes.formWrapper}>
            <Box className={classes.headerLine}>
              <Typography variant="body2">Password Change</Typography>
            </Box>

            <Box className={classes.inputWrapper}>
              <Typography color="textSecondary" variant="body1" className={classes.inputLabel}>Пароль</Typography>
              <Input
                formik={fPasswords}
                label="Старый пароль"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={classes.input}
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
            </Box>

            <Box className={classes.inputWrapper}>
              <Typography color="textSecondary" variant="body1" className={classes.inputLabel}>Новый пароль</Typography>
              <Input
                formik={fPasswords}
                label="Новый пароль"
                name="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className={classes.input}
                InputProps={{
                  endAdornment:
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowNewPassword(prev => !prev)}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                }}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" pb={4} mt={2} mr={2}>
              <SubmitButton
                className={classes.button}
                color="default"
                fullWidth={false}
                title={"Cancel"}
                disabled={compare(passwordsState, fPasswords.values)}
                onClick={handleCancelSavePasswords}
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
