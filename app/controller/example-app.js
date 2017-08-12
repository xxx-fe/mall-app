import exampleService from '../service/example-app';
const index = async (ctx, _next) => {
    let locals = {
        title: 'example-app'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'example-app';
    await ctx.render('example-app', locals);
};

const exampleList = async (ctx, _next) => {
    const service = new exampleService(ctx);
    let locals = {
        list: service.getList()
    };
    ctx.body = locals;
};

export default {
    index,
    exampleList
};
