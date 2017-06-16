import exampleService from '../service/example-app';
const index = async (ctx, _next) => {
    let locals = {
        title: 'example-app'
    };
    await ctx.render('example-app', locals);
}

const exampleList = async (ctx, _next) => {
    const service = new exampleService(ctx);
    let locals = {
        list: service.getList()
    };
    ctx.body = locals;
}

export default {
    index,
    exampleList
};
