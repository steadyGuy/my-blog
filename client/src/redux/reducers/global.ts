import { GlobalTypeActions, IPageGlobal, PAGE_LOADED } from '../constants/globalType';

const defaultState = {
  loaded: false,
};

export const globalReducer = (state = defaultState, action: GlobalTypeActions): IPageGlobal => {
  switch (action.type) {
    case PAGE_LOADED:
      return { ...state, loaded: action.payload };
    default:
      return state;
  }
}