import { Document, Schema } from 'mongoose';
import connection from '../config/db';

export interface IUser extends Document {
  id: number;
  account: string;
  name: string;
  passwordHash: string;
  avatar: string;
  loginType: 'number' | 'social' | 'email';
  role: 'user' | 'admin';
  isActive: boolean;
}

export interface ITokenUser {
  account: string;
  name: string;
  iat: number;
  exp: number;
}

export interface IRefreshTokenUser {
  id: string;
  iat: number;
  exp: number;
}

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Пожалуйста, введите имя пользователя'],
    trim: true,
    maxlength: [20, 'Максимальная длина имени 20 символов'],
    minlength: [4, 'Минимальная длина имени 4 символа'],
  },
  account: {
    type: String,
    required: [true, 'Пожалуйста, введите email или телефон'],
    trim: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'Пожалуйста, введите пароль'],
  },
  avatar: {
    type: String,
    default: 'https://lh6.googleusercontent.com/8Ube5woHn0vXW6yqD_KlX6AaGMLlFCptEA7j2xOKDK2Nyb861JanWRmyiKHPe2y2Gk7gOEY6tObisWEfSB3Z=w1920-h872-rw',
  },
  loginType: {
    type: String,
    default: 'email',
  },
  role: {
    type: String,
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default connection.model<IUser>('User', schema);
