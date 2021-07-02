import { Action } from 'redux';
import { IUser } from '../../interfaces/user';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_FAILURE = 'AUTH_FAILURE'

export interface IAuthReturned {
  accessToken: string;
  message: string;
  user: IUser | null;
}

export interface IAuthState extends IAuthReturned {
  errors: string | string[] | null;
  loading: boolean;
}

export interface IAuthActionSetSuccess extends Action<typeof AUTH_SUCCESS> {
  payload: IAuthReturned & { errors: null }
}

export interface IAuthActionSetLoading extends Action<typeof AUTH_LOADING> {
  payload: boolean;
}

export interface IAuthActionSetErrors extends Action<typeof AUTH_FAILURE> {
  payload: string | string[];
}

export type UserTypeActions = IAuthActionSetSuccess | IAuthActionSetLoading | IAuthActionSetErrors;