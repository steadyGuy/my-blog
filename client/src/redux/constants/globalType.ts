import { Action } from 'redux';

export const PAGE_LOADED = 'PAGE_LOADED';

export interface IPageGlobal {
  loaded: boolean;
}

export interface IPageLoadActionSet extends Action<typeof PAGE_LOADED> {
  payload: boolean;
}

export type GlobalTypeActions = IPageLoadActionSet;