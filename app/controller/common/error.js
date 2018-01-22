/**
 * 错误页面
 */
const index = async (ctx, next) => {
    let locals = {
        title: 'error'
    };
    ctx.state.appName = 'error';
    await ctx.render('common/error', locals);
};

export default {
    index
};
