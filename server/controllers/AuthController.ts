import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { ITokenUser, IRefreshTokenUser } from '../models/User';
import token from '../config/generateToken';
import sendEmail from '../config/sendMail';
import sendSMS from '../config/sendSMS';
import userMapper from '../mappers/user';

const CLIENT_URL = process.env.BASE_URL;

const AuthController = {
  register: async (req: Request, res: Response): Promise<any> => {
    try {
      const {
        name, account, password,
      } = req.body;

      const user = await User.findOne({ account });
      if (user) {
        return res.status(400).json({ message: 'Пользователь с таким email или телефоном уже зарегистрирован' });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const activeToken = token.activeToken({ name, account });

      const newUser = new User({
        passwordHash, name, account,
      });

      await newUser.save();

      if (account.includes('@')) {
        await sendEmail(account, `${CLIENT_URL}/active/${activeToken}`, 'Подтвердите ваш email адрес');
        return res.json({
          message: 'Успешно, пожалуйста проверьте ваш email',
        });
      }

      sendSMS(account, 'goprogramming.ru - Подтверждения вашего номера телефона');
      return res.json({
        message: 'Успешно, пожалуйста проверьте ваш телефон',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  activateAccount: async (req: Request, res: Response) => {
    try {
      console.log('HERE')
      const decoded = <ITokenUser>jwt.verify(req.body.token, `${process.env.ACTIVE_TOKEN_SECRET}`);
      const { account } = decoded;
      const user = await User.findOne({ account });
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не был зарегистрирован. Попытайтесь еще раз' });
      }
      await User.updateOne({ account }, { isActive: true });
      return res.status(200).json({ message: 'Вы успешно подтвердили свою пошту' });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Вы слишком долго подтверждали email. Попробуйте снова' });
      }
      console.log(err);
      return { message: err.message };
    }
  },
  login: async (req: Request, res: Response): Promise<any> => {
    try {
      const { account, password } = req.body;

      const user = await User.findOne({ account });

      if (!user) {
        return res.status(400).json({ message: 'Такого пользователя не существует' });
      }

      const passwordOk = await bcrypt.compare(password, user.passwordHash);
      if (!passwordOk) {
        return res.status(400).json({ message: 'Пароль неверен' });
      }

      const accessToken = token.accessToken({ id: user.id });
      const refreshToken = token.refreshToken({ id: user.id });

      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      return res.status(200).json({ message: 'Вы успешно авторизировались', accessToken, user: userMapper(user) });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  logout: async (req: Request, res: Response): Promise<any> => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' });

      return res.json({ message: 'Вы успешно разлогинились' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  refreshToken: async (req: Request, res: Response): Promise<any> => {
    try {
      const refreshToken = req.cookies.refreshtoken;
      if (!refreshToken) return res.status(400).json({ message: 'Пожалуйста, авторизируйтесь для действия' });
      const decoded = <IRefreshTokenUser>jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`);
      if (!decoded.id) return res.status(400).json({ message: 'Пожалуйста, авторизируйтесь для действия' });
      // .select('-passwordHash')
      const user = await User.findById(decoded.id).select('-passwordHash');
      if (!user) {
        return res.status(400).json({ message: 'Такого пользователя не существует' });
      }
      const accessToken = token.accessToken({ id: user.id });
      return res.json({ message: 'Успешно', accessToken });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

export default AuthController;
