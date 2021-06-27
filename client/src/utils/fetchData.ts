import axios from '../core/axios';

export const postAPI = async (url: string, form: object, token?: string): Promise<any> => {
  try {
    const { data } = await axios.post(`/${url}`, form, {
      headers: { Authorization: 'Bearer' + token, }
    });
    return data;
  } catch (err) {
    if (err?.response) {
      return err.response.data;
    }
    console.log('Error with auth request', err.message);
  }
}
