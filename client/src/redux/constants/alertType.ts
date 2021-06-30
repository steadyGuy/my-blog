import { Action } from 'redux';

export const ALERT = 'ALERT';

export interface IAlert {
  loading?: boolean;
  success?: string | string[];
  errors?: string | string[];
}

export interface IAlertActionSet extends Action<typeof ALERT> {
  payload: IAlert
}