import { Schema, Document } from 'mongoose';
import connection from '../config/db';

export interface ICategory extends Document {
  name: string;
  slug: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Пожалуйста, добавьте вашу категорию'],
    trim: true,
    maxLength: [50, 'Имя слишком большое для категории'],
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  }
}, {
  timestamps: true,
});

export default connection.model<ICategory>('Category', schema);