/**
 * 错误页面
 */
const index = async (ctx, next) => {
    let locals = {
        title: 'error'
    };
    // console.log('error page')
    // console.error(JSON.stringify(ctx.context));
    ctx.state.appName = 'error';
    await ctx.render('common/error', locals);
};

export default {
    index
};
