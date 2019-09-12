/**
 * 渲染404页面
 */
module.exports = async function render404(ctx, data) {
    let locals = {
        title: '找不到页面' || data.title
    };
    ctx.state.appKey = 'error/404';
    if (data && data.message) {
        ctx.state.message = data.message;
    }
    await ctx.render('pages/404', locals);
};
