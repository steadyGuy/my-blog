import { IUser } from './user';

export interface IArticle {
  user: string | IUser;
  title: string;
  content: string;
  description: string;
  thumbnail: File | null | string;
  category: string;
  createdAt: Date | string;
}

export interface IUploadedImageData {
  public_id: string;
  url: string;
}

export interface IHomeArticlesByCategory {
  _id: string;
  name: string;
  count: number;
  articles: IArticle[];
}