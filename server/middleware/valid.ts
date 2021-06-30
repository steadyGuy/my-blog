import { Request, Response, NextFunction } from 'express';

function validatePhone(phone: string) {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(String(phone).toLowerCase());
}

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validRegister = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const errors: string[] = [];
    const {
      name, account, password, passwordConfirm,
    } = req.body;

    if (!name) {
      errors.push('Пожалуйста, введите имя');
    }

    if (password !== passwordConfirm) {
      errors.push('Оба пароля должны совпадать');
    }

    if (password.length < 6) {
      errors.push('Длина пароля должна быть от 6 символов');
    }

    if (!account) {
      errors.push('Пожалуйста, введите email или телефон');
    }

    if (!validateEmail(account) && !validatePhone(account)) {
      errors.push('Email или телефон не валидный');
    }

    if (errors.length > 0) {
      return res.status(400).json({ messages: errors });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const validLogin = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const errors: string[] = [];
    const {
      account, password,
    } = req.body;

    if (!account) {
      errors.push('Пожалуйста, введите email или телефон');
    }

    if (!password) {
      errors.push('Пожалуйста, введите пароль');
    }

    if (!validateEmail(account) && !validatePhone(account)) {
      errors.push('Email или телефон не валидный');
    }

    if (errors.length > 0) {
      return res.status(400).json({ messages: errors });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default { validRegister, validLogin };
