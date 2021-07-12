import { Dispatch } from 'redux';
import { postAPI } from '../../utils/fetchData';
import { ALERT, IAlertActionSet } from '../constants/alertType';
import { setAlertLoading, setAlertSuccess, unsetAlertLoading } from './AlertAction';

export const createCategory = (
  name: string, token: string
) => async (dispatch: Dispatch<IAlertActionSet>) => {
  try {
    dispatch(setAlertLoading());

    const data = await postAPI('category', {
      name,
    }, token);

    if (data.error) {
      return dispatch({ type: ALERT, payload: { errors: data.error.message, loading: false } });
    }

    dispatch(unsetAlertLoading());
    dispatch(setAlertSuccess(data.message));

  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.message } });
  }
}