import axios from 'axios';
//axios默认没有这个头
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$http = axios;