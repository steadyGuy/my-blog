import {
  UserTypeActions,
  IAuthReturned,
  AUTH_SUCCESS,
  AUTH_SMS_DIALOG,
  UPDATE_USER_AVATAR,
  UPDATE_USER_NAME
} from '../constants/authType';

const initilState: IAuthReturned = {
  user: null,
  accessToken: '',
  message: '',
  dialog: false,
}

export const authReducer = (state = initilState, action: UserTypeActions): IAuthReturned => {

  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, ...action.payload };
    case AUTH_SMS_DIALOG:
      return { ...state, dialog: action.payload };
    case UPDATE_USER_AVATAR:
      return {
        ...state,
        user: state.user ? { ...state.user, avatar: action.payload.avatar } : null
      };
    case UPDATE_USER_NAME:
      return {
        ...state,
        user: state.user ? { ...state.user, name: action.payload } : null
      }
    default:
      return state;
  }

}