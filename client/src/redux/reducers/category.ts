import { ICategory } from '../../interfaces/category';
import { CategoryTypeActions, CREATE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from '../constants/categoryType';

export const categoryReducer = (state: ICategory[] = [], action: CategoryTypeActions): ICategory[] => {

  switch (action.type) {
    case CREATE_CATEGORY:
      return [action.payload, ...state];
    case GET_CATEGORIES:
      return action.payload;
    case UPDATE_CATEGORY:
      const categoryIndex = state.findIndex((cat) => cat.id === action.payload.id);
      const newState = Array.from(state);
      debugger;
      if (categoryIndex !== -1) {
        newState[categoryIndex] = action.payload;
      }
      debugger;
      return newState;
    default:
      return state;
  }

}