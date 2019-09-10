const context = require.context('../app', true, /\.vue$/, 'lazy');
/**
 * 按需加载模式
 */

let keys = context.keys().map(key => {
    //美化路径如 ./home/index.vue -> home/index 对应的 ctx.state.appKey = 'home/index'
    return key.replace(/\.vue/, '').replace('\./', '');
});

keys.map(function (item) {
    if (item === APPSTATE.appKey) {
        context(`./${item}.vue`).then(file => {
            let fileModule = file.default;
            if (document.getElementById(fileModule.appId)) {
                new Vue({
                    render: h => h(fileModule)
                }).$mount('#' + fileModule.appId);
            }
        });
    }
});

/**
 * 不按需加载模式
 */
// context.keys().forEach(key => {
//     context(key).then(file => {
//         const fileModule = file.default;
//         if (document.getElementById(fileModule.appId)) {
//             new Vue({
//                 render: h => h(fileModule)
//             }).$mount('#' + fileModule.appId);
//         }
//     });
// });

