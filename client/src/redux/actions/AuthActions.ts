import { Dispatch } from 'redux';
import { IUserSignIn } from '../../interfaces/user';
import { postAPI } from '../../utils/fetchData';
import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOADING, UserTypeActions } from '../constants/authType';

export const login = (userLogin: IUserSignIn) => async (dispatch: Dispatch<UserTypeActions>) => {
  try {
    dispatch({ type: AUTH_LOADING, payload: true });
    const data = await postAPI('login', userLogin);
    dispatch({ type: AUTH_LOADING, payload: false });

    if (data.error) {
      return dispatch({ type: AUTH_FAILURE, payload: data.error.message });
    }

    dispatch({
      type: AUTH_SUCCESS,
      payload: {
        token: data?.accessToken,
        user: data?.user,
        errors: null,
      }
    });

  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_FAILURE, payload: err.message });
  }
}