import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$http = axios;
import exampleApp from './index.vue';
$(document).ready(function(){
    new Vue({
        el: '#app',
        template: '<exampleApp/>',
        components: {exampleApp}
    });
});
