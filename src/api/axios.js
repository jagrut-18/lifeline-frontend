import axios from 'axios';

const AX = axios.create({
  baseURL: 'http://3.220.183.182:5000'
});

// AX.interceptors.request.use(function (config) {
//   const storedSession = parseInt(localStorage.getItem('session'));
//   const currentTime = Date.now();
//   if (currentTime > storedSession) {
//     window.onLogout();
//     return;
//   }
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });

export { AX }