import Vue from 'vue';
const context = require.context('../components', true, /\.vue$/);
context.keys().forEach(key => {
    const fileModule = context(key).default;
    if (fileModule.name) {
        Vue.component(fileModule.name, fileModule);
    }
});
