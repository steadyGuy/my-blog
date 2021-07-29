import { IHomeArticlesByCategory } from '../../interfaces';
import { ArticleTypeActions, GET_HOME_ARTICLES } from '../constants/articleType';

const initilState: IHomeArticlesByCategory[] = [];

export const articleReducer = (state = initilState, action: ArticleTypeActions): IHomeArticlesByCategory[] => {

  switch (action.type) {
    case GET_HOME_ARTICLES:
      return { ...state, ...action.payload };
    default:
      return state;
  }

}