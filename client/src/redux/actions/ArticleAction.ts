import { IArticle } from '../../interfaces';
import { getAPI, patchAPI, postAPI } from '../../utils/fetchData';
import { imageUpload } from '../../utils/ImageUpload';
import { GET_ARTICLES_BY_SLUG, GET_HOME_ARTICLES } from '../constants/articleType';
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
  if (!error) {
    localStorage.removeItem('article_last_state');
  }
  // dispatch({ type: CREATE_CATEGORY, payload: category });
  return { message, error };
});

export const updateArticle = wrapper(async (dispatch, article: IArticle, id: string, token: string) => {

  let url = '';
  if (typeof article.thumbnail !== 'string') {
    const photo = await imageUpload(article.thumbnail);
    url = photo[0].url;
  } else {
    url = article.thumbnail;
  }

  const newArticle = { ...article, thumbnail: url };

  const { message, error } = await patchAPI(`article/${id}`, newArticle, token);

  return { message, error };
});

export const getHomeArticles = wrapper(async (dispatch) => {
  const { message, error, articles } = await getAPI('home/articles');

  dispatch({ type: GET_HOME_ARTICLES, payload: articles });

  return { message, error };
});

export const getArticlesBySlug = wrapper(async (dispatch, id: string, search: string) => {
  let limit = 1;
  let value = search ? search : `?page=${1}`;
  const { message, error, articles: { pagesCount, data } } =
    await getAPI(`articles/${id}${value}&limit=${limit}`);
  dispatch({ type: GET_ARTICLES_BY_SLUG, payload: { id, articles: data, pagesCount, search } });

  return { message, error };
});

export const updateArticleById = wrapper(async (dispatch, id: string) => {
  // const { message, error, articles: { total, data } } =
  //   await patchAPI(`articles/${id}`);

  // dispatch({ type: GET_ARTICLES_BY_SLUG, payload: { id, articles: data, total } });

  // return { message, error };
});