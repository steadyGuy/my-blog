import { Action } from 'redux';
import { ICategory } from '../../interfaces/category';

export const CREATE_CATEGORY = 'CREATE_CATEGORY';

export interface ICategoryActionSetData extends Action<typeof CREATE_CATEGORY> {
  payload: ICategory
}

export type CategoryTypeActions = ICategoryActionSetData;