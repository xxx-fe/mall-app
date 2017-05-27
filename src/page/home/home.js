import Vue from 'vue';
import Home from './home.vue';
$(document).ready(function(){
    new Vue({
        el: '#app',
        template: '<Home/>',
        components: {Home}
    });
});
