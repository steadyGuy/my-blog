import { RootState } from '../store';

export const selectAuthLoadingState = (state: RootState) => state.auth.loading;
export const selectAuth = (state: RootState) => state.auth;
export const selectAuthErrors = (state: RootState) => state.auth.errors;
export const selectAlert = (state: RootState) => state.alert;