import axios from 'axios';
import config from '../Configs/config'
import {history} from '../Context/AppContext'

const axiosInstance = axios.create({
  baseURL: config.apiPath + config.apiVersion,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});
axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const token = localStorage.getItem('token');
  if (error.response.status === 401 && token) {

    localStorage.removeItem('token');
    history.push('/login');
  }
  return error;
});
export default axiosInstance