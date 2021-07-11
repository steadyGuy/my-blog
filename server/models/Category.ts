import { Schema, Document } from 'mongoose';
import connection from '../config/db';

export interface ICategory extends Document {
  name: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Пожалуйста, добавьте вашу категорию'],
    trim: true,
    unique: true,
    maxLength: [50, 'Имя слишком большое для категории'],
  },
}, {
  timestamps: true,
});

export default connection.model<ICategory>('Category', schema);