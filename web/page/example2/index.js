import exampleApp from './example2.vue';
$(document).ready(function(){
    new Vue({
        el: '#example2-app',
        template: '<exampleApp/>',
        components: {exampleApp}
    });
});
