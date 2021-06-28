import { RootState } from '../store';

export const selectAuthLoadingState = (state: RootState) => state.auth.loading;
export const selectAuthErrors = (state: RootState) => state.auth.errors;