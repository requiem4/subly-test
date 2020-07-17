import axios from 'axios';
import config from '../Configs/config'


const axiosInstance = axios.create({
  baseURL: config.apiPath + config.apiVersion,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});
/*axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    localStorage.clear();
    window.location = '/';
  } else {
    return Promise.reject(error);
  }
});*/
export default axiosInstance