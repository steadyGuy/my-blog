import { AnyAction, Dispatch, Middleware } from 'redux';
import { RootState } from '../store';

export const logger: Middleware<{}, RootState> = (store) => (next: Dispatch<AnyAction>) => (action) => {
  let result;
  console.groupCollapsed("dispatching", action.type);
  console.log("prev state", store.getState());
  console.log("action", action);
  result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
}
