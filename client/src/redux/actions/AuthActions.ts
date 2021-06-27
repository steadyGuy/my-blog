import { Dispatch } from 'redux';
import { IUserSignIn } from '../../interfaces/user';
import { postAPI } from '../../utils/fetchData';

export const login = (userLogin: IUserSignIn) => async (dispatch: Dispatch<any>) => {
  try {
    const data = await postAPI('login', userLogin);
    console.log('RESPONSE', data);
  } catch (err) {
    console.log(err);
  }
}