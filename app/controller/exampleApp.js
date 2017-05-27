const index = async (ctx, _next) => {
    let locals = {
        title: 'example-app',
    };
    await ctx.render('exampleApp', locals);
}

export default {
    index
};
