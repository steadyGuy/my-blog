import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3002/api',
  // headers: {
  //   Authorization: 'Bearer ' + cookies?.token,
  // }
  // withCredentials: true,
});

export default axios;

