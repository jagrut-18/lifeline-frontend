import axios from 'axios';

const AX = axios.create({
  baseURL: 'http://3.220.183.182:5000'
});

AX.interceptors.response.use(function (response) {
  console.log(localStorage.getItem('session'));
  if (localStorage.getItem('session')) {
    const storedSession = localStorage.getItem('session');
    const currentTime = Date.now();
    if (currentTime > storedSession) {
      window.onLogout();
      return {
        response_code: "230",
        error: "Session timeout: Login again!",
      };
    }
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export { AX }