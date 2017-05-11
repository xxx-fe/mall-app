const index = async (ctx, _next) => {
    let locals ={
        title : '首页'
    };
    var session = ctx.session;
    session.count = session.count || 0;
    session.count++;
    ctx.body = `${locals.title}  session:${session.count}`;
    await ctx.render('home', locals);
}

const about = async (ctx, _next) => {
    let locals ={
        title : '关于'
    };
    ctx.body = `${locals.title}`;
    await ctx.render('about', locals);
}

export default {
    index,
    about
};
