import exampleApp from './example3.vue';
$(document).ready(function(){
    new Vue({
        el: '#example3-app',
        template: '<exampleApp/>',
        components: {exampleApp}
    });
});
