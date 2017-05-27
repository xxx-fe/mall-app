import Vue from 'vue';
import exampleApp from './exampleApp.vue';
$(document).ready(function(){
    new Vue({
        el: '#app',
        template: '<exampleApp/>',
        components: {exampleApp}
    });
});
