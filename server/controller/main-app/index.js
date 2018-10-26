const mainService = require('../../service/main-app');

const pageHome = async (ctx, _next) => {
    let locals = {
        title: 'home-page'
    };
    //appName开发模式下不会加载生产后的css,只有在路由对应的控制器设置
    ctx.state.appName = 'main-app';
    await ctx.render('pages/main-app/home', locals);
};


const list = async (ctx, _next) => {
    //不需要设置ctx.state.appName
    let locals = {
        list: await mainService.getList(ctx)
    };
    ctx.body = locals;
};

module.exports.default = module.exports = {
    pageHome,
    list
};
