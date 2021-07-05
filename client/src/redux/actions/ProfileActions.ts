import { Dispatch } from 'redux';
import { checkImage, imageUpload } from '../../utils/ImageUpload';
import { ALERT, IAlertActionSet } from '../constants/alertType';
import { IAuthReturned } from '../constants/authType';
import { setAlertLoading, unsetAlertLoading } from './AlertAction';


export const updateAvatar = (
  avatar: File, auth: IAuthReturned
) => async (dispatch: Dispatch<IAlertActionSet>) => {
  if (!auth.accessToken || !auth.user) return;

  let url = '';
  try {
    dispatch(setAlertLoading());

    if (avatar) {
      const checkMsg = checkImage(avatar);

      if (checkMsg) {
        dispatch({ type: ALERT, payload: { errors: checkMsg } })
      }
      const photo = await imageUpload(avatar);
    }

    dispatch(unsetAlertLoading());

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}