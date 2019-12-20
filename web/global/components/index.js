import Vue from 'vue';
const context = require.context('../components', true, /\.vue$/);
/**
 * 全局注册组件
 */
context.keys().forEach(key => {
    const fileModule = context(key).default;
    if (fileModule.name) {
        Vue.component(fileModule.name, fileModule);
    }
});
/**
 * 全局使用组件
 */
window.docReady(function(){
    //do something
});
