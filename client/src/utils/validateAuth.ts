import * as yup from 'yup';

const loginSchema = {
  account: yup.string().test(
    'is-jimmy',
    'Email or phone number is incorrect',
    (value, context) => {
      if (!value) return true;
      if (!validateEmail(value) && !validatePhone(value)) {
        return false;
      }
      return true;
    },
  ),
  password: yup.string()
    .max(30, 'Must be 30 characters or less')
    .min(6, 'Must be at least 6 characters')
    .required('Required')
}

export const validateLogin = () => {
  return yup.object(loginSchema);
}

export const validateRegister = () => {
  return yup.object({
    ...loginSchema,
    name: yup.string()
      .required('Required')
      .max(20, 'Must be 20 characters or less')
      .min(4, 'Must be at least 4 characters'),
    passwordConfirm: yup.string()
      .required('Required')
      .oneOf([yup.ref('password'),], 'Passwords must match')
  });
}

function validatePhone(phone = '') {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(String(phone).toLowerCase());
}

function validateEmail(email = '') {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}