import axios from 'axios';
// const version = 'v1'
export default axios.create({
  baseURL: 'http://localhost:4001/',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});
