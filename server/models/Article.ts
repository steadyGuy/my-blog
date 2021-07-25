import { Schema, Document, Types } from 'mongoose';
import connection from '../config/db';
import { ICategory } from './Category';
import { IUser } from './User';

export interface IArticle extends Document {
  user: IUser;
  title: string;
  content: string;
  description: string;
  thumbnail: string;
  category: ICategory;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const schema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: [50, 'Заголовок слишком большой'],
    minLength: [10, 'Заголовок слишком маленький'],
  },
  content: {
    type: String,
    required: true,
    minLength: [100, 'Слишком мало контента'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: [50, 'Описание слишком маленькое'],
    maxLength: [250, 'Описание слишком большое'],
  },
  thumbnail: {
    type: String,
    required: true,
  },
  category: {
    type: Types.ObjectId,
    ref: 'Category',
    required: true,
  },
}, {
  timestamps: true,
});

export default connection.model<IArticle>('Article', schema);