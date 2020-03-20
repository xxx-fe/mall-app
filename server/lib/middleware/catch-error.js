/**
 * 捕获错误
 */
module.exports.default = module.exports = async (app) => {
    app.use(async (ctx, next) => {
        try {
            await next();
            if (ctx.status === 404) ctx.throw(404);
        } catch (err) {
            app.context.setState(ctx);
            let status = err.status || 500;
            if (status < 0) {
                status = 500;
            }
            ctx.status = status;
            let error = {
                status: status,
                url: ctx.path,
                xhr: ctx.request.get('X-Requested-With') === 'XMLHttpRequest',
                error: {
                    message: err.message || '',
                    stack: err.stack || ''
                }
            };

            //xhr错误直接返回,其他返回页面
            if (error.xhr) {
                ctx.body = error;
            } else {
                ctx.logger.error(JSON.stringify(error));
                if (status === 500) {
                    await ctx.app.context.render404(ctx, {
                        title: '出错啦'
                    });
                } else {
                    ctx.logger.error(JSON.stringify(error));
                }
                if (status === 404) {
                    await ctx.app.context.render404(ctx);
                }
                if (status === 401) {
                    await ctx.checkAuth(ctx);
                }
            }
        }
    });
    app.context.logger.info('catch-error initialized');
};
