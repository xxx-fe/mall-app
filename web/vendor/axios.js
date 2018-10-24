import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const service = axios.create({
    baseURL: '/',
    timeout: 10000
});
service.interceptors.response.use(
    response => {
        return response
    }, error => {
        return Promise.reject(error);
    });
Vue.prototype.$http = service;
