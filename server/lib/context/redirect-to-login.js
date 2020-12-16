/**
 * 重定向到"登陆"页面
 */
module.exports = async function redirectToLogin(ctx, url) {
    await ctx.redirect(`/${url || 'login'}?fromUrl=${encodeURIComponent(ctx.originalUrl)}`);
};
