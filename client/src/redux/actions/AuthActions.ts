import { Dispatch } from 'redux';
import { IUserSignIn, IUserSignUp } from '../../interfaces/user';
import { getAPI, postAPI } from '../../utils/fetchData';
import { ALERT, IAlertActionSet } from '../constants/alertType';
import { AUTH_SUCCESS, UserTypeActions } from '../constants/authType';
import { setAlertLoading, setAlertSuccess, unsetAlertLoading } from './AlertAction';

export const login = (userLogin: IUserSignIn) => async (dispatch: Dispatch<UserTypeActions | IAlertActionSet>) => {
  try {
    dispatch(setAlertLoading());
    const data = await postAPI('login', userLogin);

    if (data.error) {
      return dispatch({ type: ALERT, payload: { errors: data.error.message, loading: false } });
    }

    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    });
    dispatch(setAlertSuccess(data.message));

    localStorage.setItem('logged', 'true');

    dispatch(unsetAlertLoading());
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}

export const register = (userRegister: IUserSignUp) => async (dispatch: Dispatch<UserTypeActions | IAlertActionSet>) => {
  try {
    dispatch(setAlertLoading());
    const data = await postAPI('register', userRegister);

    if (data.error) {
      return dispatch({ type: ALERT, payload: { errors: data.error.message, loading: false } });
    }

    dispatch(setAlertSuccess(data?.message));

    // dispatch({
    //   type: AUTH_SUCCESS,
    //   payload: {
    //     token: data?.accessToken,
    //     user: data?.user,
    //     errors: null,
    //   }
    // });

    dispatch(unsetAlertLoading());
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}

export const refreshToken = () => async (dispatch: Dispatch<UserTypeActions | IAlertActionSet>) => {
  const logged = localStorage.getItem('logged');
  if (logged !== 'true') {
    return;
  }
  try {
    const data = await getAPI('refresh_token');
    console.log('REFRESH TOKEN', data);
    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    });
    // if (data.error) {
    //   return dispatch({ type: ALERT, payload: { errors: data.error.message, loading: false } });
    // }

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}

export const logOut = () => async (dispatch: Dispatch<UserTypeActions | IAlertActionSet>) => {
  localStorage.removeItem('logged');
  try {
    await getAPI('logout');
    window.location.href = '/';
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}

export const googleLogin = (tokenId: string) => async (dispatch: Dispatch<UserTypeActions | IAlertActionSet>) => {
  try {
    dispatch(setAlertLoading());
    const data = await postAPI('google_login', { tokenId });

    if (data.error) {
      return dispatch({ type: ALERT, payload: { errors: data.error.message, loading: false } });
    }

    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    });
    dispatch(setAlertSuccess(data.message));

    localStorage.setItem('logged', 'true');

    dispatch(unsetAlertLoading());
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}