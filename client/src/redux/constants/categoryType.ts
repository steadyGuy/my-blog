import { Action } from 'redux';
import { ICategory } from '../../interfaces/category';

export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export interface ICategoryActionSetData extends Action<typeof CREATE_CATEGORY> {
  payload: ICategory
}

export interface ICategoryActionGetData extends Action<typeof GET_CATEGORIES> {
  payload: ICategory[]
}

export type CategoryTypeActions = ICategoryActionSetData | ICategoryActionGetData;