const index = async (ctx, _next) => {
    let locals = {
        title: '新闻',
    };
    await ctx.render('exampleNews', locals);
}

export default {
    index
};
