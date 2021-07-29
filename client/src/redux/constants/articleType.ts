import { Action } from 'redux';
import { IHomeArticlesByCategory } from '../../interfaces';

export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const GET_HOME_ARTICLES = 'GET_HOME_ARTICLES';

export interface IArticleActionGetAll extends Action<typeof GET_HOME_ARTICLES> {
  payload: IHomeArticlesByCategory[]
}

export type ArticleTypeActions =
  | IArticleActionGetAll;