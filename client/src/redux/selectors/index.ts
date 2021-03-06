import { createSelector } from 'reselect'
import { RootState } from '../store';

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthDialogState = (state: RootState) => state.auth.dialog;
export const selectAlert = (state: RootState) => state.alert;

export const selectCategories = (state: RootState) => state.categories;
export const selectArticlesHome = (state: RootState) => state.articlesByCategoryHome;
export const selectArticlesByCategory = (state: RootState) => state.articlesByCategory;

export const selectGlobal = (state: RootState) => state.global;