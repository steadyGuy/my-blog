import { ICategory } from '../../interfaces/category';
import { deleteAPI, getAPI, patchAPI, postAPI } from '../../utils/fetchData';
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from '../constants/categoryType';
import { wrapper } from './hof';

export const createCategory = wrapper(async (dispatch, name: string, token: string) => {
  const { category, error, message } = await postAPI('category', {
    name,
  }, token);

  dispatch({ type: CREATE_CATEGORY, payload: category });
  return { message, error };
});

export const updateCategory = wrapper(async (dispatch, newCategory: ICategory, token: string) => {
  const { error, message } = await patchAPI(`category/${newCategory.id}`, {
    id: newCategory, name: newCategory.name,
  }, token);

  dispatch({ type: UPDATE_CATEGORY, payload: newCategory });
  return { message, error };
});

export const deleteCategory = wrapper(async (dispatch, catId: string, token: string) => {
  const { error, message } = await deleteAPI(`category/${catId}`, token);

  dispatch({ type: DELETE_CATEGORY, payload: catId });
  return { message, error };
});

export const getCategories = wrapper(async (dispatch) => {
  const { categories, error } = await getAPI('category');

  dispatch({ type: GET_CATEGORIES, payload: categories });
  return { error };
});