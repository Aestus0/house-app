/*
 * @Description: In User Settings Edit
 * @Author: huangtianyang
 * @Date: 2019-11-16 19:25
 */
import axios from 'axios';
import { createHashHistory } from 'history';

const a = axios;
a.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const history = createHashHistory();
a.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      history.push('/login');
    } else {
      Promise.reject(error);
    }
  },
);

export default a;
