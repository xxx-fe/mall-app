const exampleService = require('../../service/example/example');

const index = async (ctx, _next) => {
    let locals = {
        title: 'example'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'example';
    await ctx.render('page/example', locals);
};

const list = async (ctx, _next) => {
    let locals = {
        list: await exampleService.getList(ctx)
    };
    ctx.body = locals;
};

module.exports.default = module.exports = {
    index,
    list
};
