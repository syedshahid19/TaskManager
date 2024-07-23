import axios from "axios";
import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getToken = () => {
  const tokenFromCookies = Cookies.get('token'); 
  const tokenFromLocalStorage = localStorage.getItem('token'); 
  // console.log('Token from Cookies:', tokenFromCookies); // Debugging line
  // console.log('Token from Local Storage:', tokenFromLocalStorage); // Debugging line
  return tokenFromCookies || tokenFromLocalStorage;
};

const api = axios.create({
  baseURL: BASE_URL,
});

const token = getToken();
if (token) {
  // console.log('Setting Authorization header:', `Bearer ${token}`); // Debugging line
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  console.error('No token found'); // Debugging line
}

export default api;
