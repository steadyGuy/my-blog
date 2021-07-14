import { createSelector } from 'reselect'
import { RootState } from '../store';

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthDialogState = (state: RootState) => state.auth.dialog;
export const selectAlert = (state: RootState) => state.alert;

export const selectCategories = (state: RootState) => state.categories;