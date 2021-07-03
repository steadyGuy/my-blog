import { UserTypeActions, IAuthReturned, AUTH_SUCCESS, AUTH_SMS_DIALOG } from '../constants/authType';

const initilState: IAuthReturned = {
  user: null,
  accessToken: '',
  message: '',
}

export const authReducer = (state = initilState, action: UserTypeActions): IAuthReturned => {

  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, ...action.payload };
    case AUTH_SMS_DIALOG:
      return { ...state, dialog: action.payload };
    default:
      return state;
  }

}