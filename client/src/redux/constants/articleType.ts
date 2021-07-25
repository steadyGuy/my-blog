import { Action } from 'redux';
import { IUser } from '../../interfaces/user';

export const CREATE_ARTICLE = 'CREATE_ARTICLE';

// export interface IAuthReturned {
//   accessToken: string;
//   message: string;
//   user: IUser | null;
//   dialog?: boolean;
// }

// export interface IUserAvatar {
//   avatar: string;
// }

// export interface IProfileActionSetAvatar extends Action<typeof UPDATE_USER_AVATAR> {
//   payload: IUserAvatar
// }

// export interface IAuthActionSetSuccess extends Action<typeof AUTH_SUCCESS> {
//   payload: IAuthReturned & { errors: null }
// }

// export interface IAuthActionSetSmsDialog extends Action<typeof AUTH_SMS_DIALOG> {
//   payload: boolean,
// }

// export type UserTypeActions = IAuthActionSetSuccess | IAuthActionSetSmsDialog | IProfileActionSetAvatar;