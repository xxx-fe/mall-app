const index = async (ctx, _next) => {
    let locals ={
        title : '首页'
    };
    var session = ctx.session;
    session.count = session.count || 0;
    session.count++;
    ctx.body = `${locals.title}  session:${session.count}`;
    //await ctx.render('home/index', locals);
}


const about = async (ctx, _next) => {
    let locals ={
        title : '关于'
    };
    ctx.body = `${locals.title}`;
    //await ctx.render('home/about', locals);
}

export default {
    index,
    about
};
