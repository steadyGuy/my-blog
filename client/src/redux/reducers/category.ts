import { ICategory } from '../../interfaces/category';
import { CategoryTypeActions, CREATE_CATEGORY, GET_CATEGORIES } from '../constants/categoryType';

export const categoryReducer = (state: ICategory[] = [], action: CategoryTypeActions): ICategory[] => {

  switch (action.type) {
    case CREATE_CATEGORY:
      return [action.payload, ...state];
    case GET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }

}