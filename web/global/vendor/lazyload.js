import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '/public/img/loading.gif',
    loading: '/public/img/loading.gif'
});
