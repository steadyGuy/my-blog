import axios from '../core/axios';

export const postAPI = async (url: string, form: object, token?: string): Promise<any> => {
  try {
    const { data } = await axios.post(`/${url}`, form, {
      headers: { Authorization: 'Bearer' + token, }
    });
    return data;
  } catch (err) {
    if (err?.response) {
      return { error: err.response?.data };
    }
    console.log('Error with auth request', err.message);
  }
}

export const getAPI = async (url: string, token?: string): Promise<any> => {
  try {
    const { data } = await axios.get(`/${url}`, {
      headers: { Authorization: 'Bearer' + token, }
    });
    return data;
  } catch (err) {
    if (err?.response) {
      return { error: err.response?.data };
    }
    console.log('Error with auth request', err.message);
  }
}

export const patchAPI = async (url: string, form: object, token?: string): Promise<any> => {
  try {
    const { data } = await axios.patch(`/${url}`, form, {
      headers: { Authorization: 'Bearer ' + token, }
    });
    return data;
  } catch (err) {
    console.log('Error with auth request', err.message);
    if (err?.response) {
      return { error: err.response?.data };
    }
  }
}