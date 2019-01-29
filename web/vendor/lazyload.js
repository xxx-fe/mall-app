import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://static.gongyimarket.com/mini-portal/public/images/expo/logo.jpg',
    loading: '/public/img/loading.gif'
});
