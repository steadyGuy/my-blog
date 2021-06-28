import { Dispatch } from 'redux';
import { IUserSignIn } from '../../interfaces/user';
import { postAPI } from '../../utils/fetchData';
import { AUTH, AUTH_FAILURE, AUTH_LOADING, UserTypeActions } from '../constants/authType';

export const login = (userLogin: IUserSignIn) => async (dispatch: Dispatch<UserTypeActions>) => {
  try {
    dispatch({ type: AUTH_LOADING, payload: true });
    const data = await postAPI('login', userLogin);
    if (data.error) {
      dispatch({ type: AUTH_FAILURE, payload: data.error });
    }

    dispatch({
      type: AUTH,
      payload: {
        token: data?.accessToken,
        user: data?.user,
      }
    });
    dispatch({ type: AUTH_LOADING, payload: false });
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_FAILURE, payload: err.message });
  }
}