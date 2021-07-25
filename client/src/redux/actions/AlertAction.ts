import { ALERT, IAlertActionSet } from '../constants/alertType'

export const setAlertLoading = (): IAlertActionSet => ({
  type: ALERT,
  payload: {
    loading: true,
  },
});

export const setAlertSuccess = (msg: string): IAlertActionSet => ({
  type: ALERT,
  payload: {
    success: msg,
  },
});

export const setAlertFailure = (msg: string): IAlertActionSet => ({
  type: ALERT,
  payload: {
    errors: msg,
  },
});

export const unsetAlertLoading = (): IAlertActionSet => ({
  type: ALERT,
  payload: {
    loading: false,
  },
});


export const unsetAlertState = (): IAlertActionSet => ({
  type: ALERT,
  payload: {
    loading: false,
    errors: '',
    success: '',
  },
});