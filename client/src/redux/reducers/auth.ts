import { UserTypeActions, AUTH_SUCCESS, IAuthState, AUTH_LOADING, AUTH_FAILURE } from '../constants/authType';

const initilState: IAuthState = {
  user: null,
  token: '',
  loading: false,
  errors: null
}

export const authReducer = (state = initilState, action: UserTypeActions): IAuthState => {

  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, ...action.payload };
    case AUTH_LOADING:
      return { ...state, loading: action.payload }
    case AUTH_FAILURE:
      return { ...state, errors: action.payload }
    default:
      return state;
  }

}