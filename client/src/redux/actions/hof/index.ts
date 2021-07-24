import { Dispatch } from 'redux'
import { ALERT, IAlertActionSet } from '../../constants/alertType'
import { CategoryTypeActions } from '../../constants/categoryType'
import { setAlertLoading, setAlertSuccess, unsetAlertLoading } from '../AlertAction'

export type CallbackWithDispatcher = {
  (dispatch: Dispatch<IAlertActionSet | CategoryTypeActions>, ...args: any): any;
}

export const wrapper = (f: CallbackWithDispatcher) => (...args: any) => {
  return async function (dispatch: Dispatch<IAlertActionSet | CategoryTypeActions>) {
    try {
      dispatch(setAlertLoading());

      const { message, error } = await f.apply(null, [dispatch, ...args]);

      if (error) {
        return dispatch({ type: ALERT, payload: { errors: error.message, loading: false } });
      }

      dispatch(unsetAlertLoading());
      if (message) dispatch(setAlertSuccess(message));
    } catch (err) {
      dispatch({ type: ALERT, payload: { errors: err.message } });
    }
  }
}