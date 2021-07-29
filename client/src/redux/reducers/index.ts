import { combineReducers } from 'redux';
import { alertReducer } from './alert';
import { articleReducer } from './article';
import { authReducer } from './auth';
import { categoryReducer } from './category';
import { globalReducer } from './global';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  categories: categoryReducer,
  global: globalReducer,
  articlesByCategory: articleReducer,
});