import axios from 'axios';
const baseURL = 'http://192.168.246.39:3333'; 

const apiClient = axios.create({
  baseURL,
});

export { apiClient };
