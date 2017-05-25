import Vue from 'vue';
import About from './about.vue';
import ElementUI from 'element-ui';
$(document).ready(function(){
    Vue.use(ElementUI);
    new Vue({
        el: '#app',
        template: '<About/>',
        components: {About}
    });
});
