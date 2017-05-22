const index = async (ctx, _next) => {
    let locals = {
        title: '首页',
    };
    await ctx.render('home', locals);
}

const about = async (ctx, _next) => {
    let locals = {
        title: '关于'
    };
    await ctx.render('about', locals);
}

export default {
    index,
    about
};
