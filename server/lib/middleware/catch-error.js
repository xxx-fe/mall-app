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
            if (status === 500) {
                if (error.xhr) {
                    return false;
                }
                let message = '出错啦!';
                let locals = {
                    title: message
                };
                ctx.state.message = message;
                ctx.state.appKey = 'error/404';
                await ctx.render('pages/404', locals);
                //throw err;
            } else {
                ctx.logger.error(JSON.stringify(error));
            }
            if (status === 404) {
                if (error.xhr) {
                    return false;
                } else {
                    let locals = {
                        title: '找不到页面'
                    };
                    ctx.state.appKey = 'error/404';
                    await ctx.render('pages/404', locals);
                }
            }
            if (status === 401) {
                if (error.xhr) {
                    return false;
                } else {
                    await ctx.checkAuth({}, ctx);
                }
            }
        }
    });
    app.context.logger.info('catch-error initialized');
};
