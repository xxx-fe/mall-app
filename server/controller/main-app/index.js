const mainService = require('../../service/main-app');

const pageHome = async (ctx, _next) => {
    let locals = {
        title: 'home-page'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'main-app';
    await ctx.render('pages/main-app/home', locals);
};


const list = async (ctx, _next) => {
    let locals = {
        list: await mainService.getList(ctx)
    };
    ctx.body = locals;
};

module.exports.default = module.exports = {
    pageHome,
    list
};
