/**
 * 检查权限
 */
module.exports = async function checkAuth(ctx, data) {
    if (data.status === 401 || ctx.status === 401) {
        let from = (ctx.originalUrl && ctx.originalUrl !== '/') ? '?fromUrl=' + encodeURIComponent(ctx.originalUrl) : '';
        await ctx.redirect(`/login` + from);
    } else {
        await ctx.app.context.render404(ctx, data);
    }
};
