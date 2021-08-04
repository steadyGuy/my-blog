import { Action } from 'redux';
import { IArticlesByCategory, IHomeArticlesByCategory } from '../../interfaces';

export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const GET_HOME_ARTICLES = 'GET_HOME_ARTICLES';
export const GET_ARTICLES_BY_SLUG = 'GET_ARTICLES_BY_SLUG';

export interface IArticleActionGetAll extends Action<typeof GET_HOME_ARTICLES> {
  payload: IHomeArticlesByCategory[]
}

export interface IArticleActionGetBySlug extends Action<typeof GET_ARTICLES_BY_SLUG> {
  payload: IArticlesByCategory
}

export type ArticleTypeActions =
  | IArticleActionGetAll
  | IArticleActionGetBySlug;