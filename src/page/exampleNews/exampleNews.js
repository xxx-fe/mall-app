import Vue from 'vue';
import exampleNews from './exampleNews';
$(document).ready(function(){
    Vue.use(ElementUI);
    new Vue({
        el: '#app',
        template: '<exampleNews/>',
        components: {exampleNews}
    });
});
