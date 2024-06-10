import axios from 'axios';

const path = __dirname;
const url = path + 'api/v1/';

const api = axios.create({
  baseURL: url,
});

export default api;
