import * as yup from 'yup';

export const validateLogin = () => {
  return yup.object({
    email: yup.string().email('Invalid email address'),
    password: yup.string()
      .max(30, 'Must be 30 characters or less')
      .min(6, 'Must be at least 6 characters')
      .required('Required')
  });
}
