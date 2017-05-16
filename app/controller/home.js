const index = async (ctx, _next) => {
    let locals = {
        title: '首页',
        userName: '阿萨德阿萨德'
    };
    var session = ctx.session;
    session.count = session.count || 0;
    session.count++;
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
