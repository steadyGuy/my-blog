import { IArticle } from '../../interfaces';
import { getAPI, postAPI } from '../../utils/fetchData';
import { imageUpload } from '../../utils/ImageUpload';
import { GET_HOME_ARTICLES } from '../constants/articleType';
import { wrapper } from './hof';

export const createArticle = wrapper(async (dispatch, article: IArticle, token: string) => {
  let url = '';
  if (typeof article.thumbnail !== 'string') {
    const photo = await imageUpload(article.thumbnail);
    url = photo[0].url;
  } else {
    url = article.thumbnail;
  }

  const newArticle = { ...article, thumbnail: url };

  const { message, error } = await postAPI('article', newArticle, token);

  // dispatch({ type: CREATE_CATEGORY, payload: category });
  return { message, error };
});

export const getHomeArticles = wrapper(async (dispatch) => {
  const { message, error, articles } = await getAPI('home/articles');

  dispatch({ type: GET_HOME_ARTICLES, payload: articles });

  return { message, error };
});