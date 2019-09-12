import axios from 'axios';
import {Message} from 'element-ui'

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
        Message({
            message: error
        });
        return Promise.reject(error);
    });
global.axios = service;
