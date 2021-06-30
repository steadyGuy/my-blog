export const d = 2;
// import { Action } from 'redux';
// import { IUser } from '../../interfaces/user';

// export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// export const REGISTER_LOADING = 'REGISTER_LOADING'
// export const REGISTER_FAILURE = 'REGISTER_FAILURE'

// export interface IAuthReturned {
//   token: string;
//   user: IUser | null;
// }

// export interface IAuthState extends IAuthReturned {
//   errors: string | string[] | null;
//   loading: boolean;
// }

// export interface IAuthActionSetSuccess extends Action<typeof AUTH_SUCCESS> {
//   payload: IAuthReturned & { errors: null }
// }

// export interface IAuthActionSetLoading extends Action<typeof AUTH_LOADING> {
//   payload: boolean;
// }

// export interface IAuthActionSetErrors extends Action<typeof AUTH_FAILURE> {
//   payload: string | string[];
// }

// export type UserTypeActions = IAuthActionSetSuccess | IAuthActionSetLoading | IAuthActionSetErrors;