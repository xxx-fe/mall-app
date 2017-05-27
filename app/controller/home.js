const index = async (ctx, _next) => {
    let locals = {
        title: '首页',
    };
    await ctx.render('home', locals);
}

export default {
    index
};
