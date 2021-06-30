import { ALERT, IAlert, IAlertActionSet } from '../constants/alertType';

const initilState: IAlert = {
  loading: false,
  success: '',
  errors: '',
}

export const alertReducer = (state = initilState, action: IAlertActionSet): IAlert => {

  switch (action.type) {
    case ALERT:
      return { ...state, ...action.payload };
    default:
      return state;
  }

}