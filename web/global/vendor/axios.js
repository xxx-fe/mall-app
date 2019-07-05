import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const service = axios.create({
    baseURL: '/',
    timeout: 10000
});

service.interceptors.response.use(
    response => {
        return response;
    }, error => {
        return Promise.reject(error);
    });
global.axios = service;
