import axios from 'axios';

const AX = axios.create({
  baseURL: 'http://3.220.183.182:5000'
});

export { AX }