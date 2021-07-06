import { Dispatch } from 'redux';
import { patchAPI } from '../../utils/fetchData';
import { checkImage, imageUpload } from '../../utils/ImageUpload';
import { ALERT, IAlertActionSet } from '../constants/alertType';
import { IAuthReturned, UPDATE_USER_AVATAR, UserTypeActions } from '../constants/authType';
import { setAlertLoading, setAlertSuccess, unsetAlertLoading } from './AlertAction';


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
      url = res.url;
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