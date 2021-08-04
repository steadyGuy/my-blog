import { IArticlesByCategory } from '../../interfaces';
import { ArticleTypeActions, GET_ARTICLES_BY_SLUG } from '../constants/articleType';

const initilState: IArticlesByCategory[] = [];

export const articlesByCategory = (state = initilState, action: ArticleTypeActions): IArticlesByCategory[] => {

  switch (action.type) {
    case GET_ARTICLES_BY_SLUG:
      return [...state, action.payload];
    default:
      return state;
  }

}