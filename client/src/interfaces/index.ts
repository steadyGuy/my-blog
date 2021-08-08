import { IUser } from './user';

export interface ICategory {
  _id: string;
  id: string;
  slug: string;
  name: string;
  createdAt: string | Date;
}

export interface IArticle {
  _id?: string;
  user: string | IUser;
  title: string;
  content: string;
  description: string;
  thumbnail: File | null | string;
  category: string | ICategory;
  createdAt: Date | string;
}

export interface IUploadedImageData {
  public_id: string;
  url: string;
}

export interface IHomeArticlesByCategory {
  _id: string;
  name: string;
  slug: string;
  count: number;
  articles: IArticle[];
}

export interface IArticlesByCategory {
  id: string;
  pagesCount: number;
  search: string;
  articles: IArticle[];
}