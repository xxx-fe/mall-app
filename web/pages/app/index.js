//默认一个app入口
const context = require.context('../app', true, /\.vue$/);
context.keys().forEach(key => {
    const fileModule = context(key).default;
    let appId = fileModule.appId;
    if (document.getElementById(appId)) {
        new Vue({
            render: h => h(fileModule)
        }).$mount('#' + appId);
        return false;
    }
});
//其他app定义....
