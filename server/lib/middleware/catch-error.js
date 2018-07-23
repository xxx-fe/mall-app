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
            ctx.status = status;
            ctx.state.error = {
                status: status,
                url: ctx.path,
                xhr: ctx.request.get('X-Requested-With') === 'XMLHttpRequest',
                error: {
                    message: err.message || '',
                    stack: err.stack || ''
                }
            };
            if (status === 500) {
                throw err;
            }
            else {
                ctx.logger.error(JSON.stringify(ctx.state.error));
            }
            if (status === 404) {
                await ctx.render('common/error');
            }
        }
    });
    app.context.logger.info('catch-error initialized');
};
