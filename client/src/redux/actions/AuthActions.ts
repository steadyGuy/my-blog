import { Dispatch } from 'redux';
import { IUserSignIn, IUserSignUp } from '../../interfaces/user';
import { postAPI } from '../../utils/fetchData';
import { ALERT, IAlertActionSet } from '../constants/alertType';
import { AUTH_SUCCESS, AUTH_FAILURE, AUTH_LOADING, UserTypeActions } from '../constants/authType';
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
      payload: {
        token: data?.accessToken,
        user: data?.user,
        errors: null,
      }
    });

    dispatch(unsetAlertLoading());

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}

export const register = (userRegister: IUserSignUp) => async (dispatch: Dispatch<UserTypeActions | IAlertActionSet>) => {
  try {
    dispatch(setAlertLoading());
    const data = await postAPI('register', userRegister);
    // debugger;
    dispatch({ type: AUTH_LOADING, payload: false });

    if (data.error) {
      return dispatch({ type: ALERT, payload: { errors: data.error.message, loading: false } });
    }

    dispatch(setAlertSuccess(data?.message));

    dispatch({
      type: AUTH_SUCCESS,
      payload: {
        token: data?.accessToken,
        user: data?.user,
        errors: null,
      }
    });

    dispatch(unsetAlertLoading());
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}