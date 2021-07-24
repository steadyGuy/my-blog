import { IUser } from './user';

export interface IArticle {
  user: string | IUser;
  title: string;
  content: string;
  description: string;
  thumbnail: File | null;
  category: string;
  createdAt: Date | string;
}