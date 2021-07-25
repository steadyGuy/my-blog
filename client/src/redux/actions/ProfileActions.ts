import { Dispatch } from 'redux';
import { patchAPI } from '../../utils/fetchData';
import { checkImage, imageUpload } from '../../utils/ImageUpload';
import { ALERT, IAlertActionSet } from '../constants/alertType';
import { IAuthReturned, UPDATE_USER_AVATAR, UPDATE_USER_NAME, UserTypeActions } from '../constants/authType';
import { setAlertLoading, setAlertSuccess, unsetAlertLoading } from './AlertAction';
import { wrapper } from './hof';


export const updateAvatar = (
  avatar: File | null, auth: IAuthReturned
) => async (dispatch: Dispatch<IAlertActionSet | UserTypeActions>) => {
  if (!auth.accessToken || !auth.user) return;

  let url = '';
  try {
    dispatch(setAlertLoading());

    if (avatar) {
      const checkMsg = checkImage(avatar);

      if (checkMsg) {
        return dispatch({ type: ALERT, payload: { errors: checkMsg } })
      }
      const res = await imageUpload(avatar);
      url = res[0].url;
    }

    const { error, message } = await patchAPI('user/avatar', {
      avatar: url ? url : auth.user.avatar,
    }, auth.accessToken);

    if (error) {
      return dispatch({ type: ALERT, payload: { errors: error.message, loading: false } });
    }

    dispatch({
      type: UPDATE_USER_AVATAR,
      payload: { avatar: url },
    });
    dispatch(unsetAlertLoading());
    dispatch(setAlertSuccess(message));

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}

export const resetPassword = (
  password: string, newPassword: string, accessToken: string
) => async (dispatch: Dispatch<IAlertActionSet | UserTypeActions>) => {
  try {
    dispatch(setAlertLoading());
    const { error, message } = await patchAPI('reset_password', {
      password, newPassword
    }, accessToken);

    if (error) {
      return dispatch({ type: ALERT, payload: { errors: error.message, loading: false } });
    }


    dispatch(unsetAlertLoading());
    dispatch(setAlertSuccess(message));

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}

export const updateProfileName = wrapper(async (dispatch, name: string, token: string) => {
  const { error, message } = await patchAPI('user_change_name', {
    name
  }, token);

  dispatch({ type: UPDATE_USER_NAME, payload: name });
  debugger
  return { message, error };
});
