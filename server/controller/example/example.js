const exampleService = require('../../service/example/example');

const index = async (ctx, _next) => {
    let locals = {
        title: 'example'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'example';
    await ctx.render('page/example', locals);
};

const index2 = async (ctx, _next) => {
    let locals = {
        title: 'example2'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'example2';
    await ctx.render('page/example2', locals);
};

const index3 = async (ctx, _next) => {
    let locals = {
        title: 'example3'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'example3';
    await ctx.render('page/example3', locals);
};

const list = async (ctx, _next) => {
    let locals = {
        list: await exampleService.getList(ctx)
    };
    ctx.body = locals;
};

module.exports.default = module.exports = {
    index,
    index2,
    index3,
    list
};
