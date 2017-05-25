import Vue from 'vue';
import Home from './home.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
$(document).ready(function(){
    Vue.use(ElementUI);
    new Vue({
        el: '#app',
        template: '<Home/>',
        components: {Home}
    });
});
