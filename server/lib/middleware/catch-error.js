/**
 * 捕获错误
 */
module.exports.default = module.exports = async (app) => {
    app.use(async (ctx, next) => {
        try {
            await next();
            if (ctx.status === 404) ctx.throw(404);
        } catch (err) {
            let status = err.status || 500;
            if (status < 0) {
                status = 500;
            }

            ctx.state.error = {
                status: status,
                error: err,
                url: ctx.path,
                xhr: ctx.request.get('X-Requested-With') === 'XMLHttpRequest'
            };
            console.error(JSON.stringify(ctx.state.error));
            if (status === 404) {
                await ctx.redirect('/error');
            }
        }
    });
    console.log('catch-error initialized');
};
