import { IArticle } from '../../interfaces';
import { postAPI } from '../../utils/fetchData';
import { imageUpload } from '../../utils/ImageUpload';
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

  debugger;
  // dispatch({ type: CREATE_CATEGORY, payload: category });
  return { message, error };
});