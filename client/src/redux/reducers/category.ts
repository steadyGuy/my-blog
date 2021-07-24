import { ICategory } from '../../interfaces/category';
import {
  CategoryTypeActions,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY
} from '../constants/categoryType';

export const categoryReducer = (state: ICategory[] = [], action: CategoryTypeActions): ICategory[] => {

  switch (action.type) {
    case CREATE_CATEGORY:
      return [action.payload, ...state];
    case GET_CATEGORIES:
      return action.payload;
    case UPDATE_CATEGORY:
      const categoryIndex = state.findIndex((cat) => cat.id === action.payload.id);
      const newState = Array.from(state);
      if (categoryIndex !== -1) {
        newState[categoryIndex] = action.payload;
      }
      return newState;
    case DELETE_CATEGORY:
      return state.filter(cat => action.payload !== cat.id)
    default:
      return state;
  }

}