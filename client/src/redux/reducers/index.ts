import { combineReducers } from 'redux';
import { alertReducer } from './alert';
import { authReducer } from './auth';
import { categoryReducer } from './category';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  categories: categoryReducer,
});