import { Action } from 'redux';
import { IUser } from '../../interfaces/user';

export const AUTH = 'AUTH';
export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_FAILURE = 'AUTH_FAILURE'

export interface IAuthReturned {
  token: string;
  user: IUser | null;
}

export interface IAuthState extends IAuthReturned {
  errors: string | string[] | null;
  loading: boolean;
}

export interface IAuthActionType extends Action<typeof AUTH> {
  payload: IAuthReturned
}

export interface IAuthActionSetLoading extends Action<typeof AUTH_LOADING> {
  payload: boolean;
}

export interface IAuthActionSetErrors extends Action<typeof AUTH_FAILURE> {
  payload: string | string[];
}

export type UserTypeActions = IAuthActionType | IAuthActionSetLoading | IAuthActionSetErrors;