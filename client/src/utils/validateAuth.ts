import * as yup from 'yup';
import { checkImage } from './ImageUpload';

const loginSchema = {
  account: yup.string().test(
    'is-emailOrnumber',
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
      .max(20, 'Must be 20 characters or less')
      .min(4, 'Must be at least 4 characters'),
    passwordConfirm: yup.string()
      .required('Required')
      .oneOf([yup.ref('password'),], 'Passwords must match')
  });
}

export const validateName = () => {
  return yup.object({
    name: yup.string()
      .required('Поле обязательное')
      .max(20, 'Must be 20 characters or less')
      .min(4, 'Must be at least 4 characters'),
  });
}

export const validateArticle = () => {
  return yup.object({
    category: yup.string()
      .ensure()
      .required("Категория обязательна"),
    title: yup.string()
      .required('Обязательное поле')
      .max(50, 'Must be 50 characters or less')
      .min(10, 'Must be at least 10 characters'),
    content: yup.string()
      .required('Обязательное поле')
      .min(10, 'Must be at least 10 characters'),
    description: yup.string()
      .required('Обязательное поле')
      .max(250, 'Must be 250 characters or less')
      .min(50, 'Must be at least 50 characters'),
    thumbnail: yup.mixed().test('is-image', '', function (value: File) {
      const { path, parent, createError } = this;
      const msg = checkImage(value);
      if (msg) {
        return createError({
          path,
          message: msg
        });
      }
      return true;
    })
  });
}

export const validatePasswords = () => {
  return yup.object({
    newPassword: yup.string()
      .required('Обязательно при заполнении')
      .max(20, 'Must be 20 characters or less')
      .min(4, 'Must be at least 4 characters'),
    password: yup.string()
      .required('Обязательно при заполнении')
      .max(20, 'Must be 20 characters or less')
      .min(4, 'Must be at least 4 characters'),
  });
}

export const loginSchemaPhone = () => {
  return yup.object({
    phone: yup.string()
      .required('Required')
      .test(
        'is-phone',
        'Номер телефона невалидный',
        (value, context) => {
          if (!value) return true;
          if (!validatePhone(value)) return false;
          return true;
        },
      ),
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