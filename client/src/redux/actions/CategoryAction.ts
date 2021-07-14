import { Dispatch } from 'redux';
import { ICategory } from '../../interfaces/category';
import { getAPI, patchAPI, postAPI } from '../../utils/fetchData';
import { ALERT, IAlertActionSet } from '../constants/alertType';
import { CategoryTypeActions, CREATE_CATEGORY, GET_CATEGORIES } from '../constants/categoryType';
import { setAlertLoading, setAlertSuccess, unsetAlertLoading } from './AlertAction';

export const createCategory = (
  name: string, token: string
) => async (dispatch: Dispatch<IAlertActionSet | CategoryTypeActions>) => {
  try {
    dispatch(setAlertLoading());

    const { category, error, message } = await postAPI('category', {
      name,
    }, token);

    if (error) {
      return dispatch({ type: ALERT, payload: { errors: error.message, loading: false } });
    }
    dispatch({ type: CREATE_CATEGORY, payload: category });
    dispatch(unsetAlertLoading());
    dispatch(setAlertSuccess(message));

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}

export const updateCategory = (
  newCategory: ICategory, token: string
) => async (dispatch: Dispatch<IAlertActionSet | CategoryTypeActions>) => {
  try {
    dispatch(setAlertLoading());

    const { category, error, message } = await patchAPI('category', {
      id: newCategory, name: newCategory.name,
    }, token);

    if (error) {
      return dispatch({ type: ALERT, payload: { errors: error.message, loading: false } });
    }
    dispatch({ type: CREATE_CATEGORY, payload: category });
    dispatch(unsetAlertLoading());
    dispatch(setAlertSuccess(message));

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}

export const getCategories = () => async (dispatch: Dispatch<IAlertActionSet | CategoryTypeActions>) => {
  try {
    dispatch(setAlertLoading());

    const { categories, error } = await getAPI('category');

    if (error) {
      return dispatch({ type: ALERT, payload: { errors: error.message, loading: false } });
    }

    dispatch({ type: GET_CATEGORIES, payload: categories });
    dispatch(unsetAlertLoading());
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}