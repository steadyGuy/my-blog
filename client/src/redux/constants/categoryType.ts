import { Action } from 'redux';
import { ICategory } from '../../interfaces';

export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export interface ICategoryActionSetData extends Action<typeof CREATE_CATEGORY> {
  payload: ICategory
}

export interface ICategoryActionGetData extends Action<typeof GET_CATEGORIES> {
  payload: ICategory[]
}

export interface ICategoryActionUpdateData extends Action<typeof UPDATE_CATEGORY> {
  payload: ICategory
}

export interface ICategoryActionDeleteData extends Action<typeof DELETE_CATEGORY> {
  payload: string
}

export type CategoryTypeActions =
  | ICategoryActionSetData
  | ICategoryActionGetData
  | ICategoryActionUpdateData
  | ICategoryActionDeleteData;