/**
 * 捕获错误
 */
export const catchError = async (app) => {
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
                url: ctx.path
            };

            console.error(JSON.stringify(ctx.state.error));

            if (ctx.header.referer && ctx.request.originalUrl.indexOf('.') > -1) {
                ctx.throw(404);
            }
            else if (status === 404) {
                await ctx.redirect('/error');
            }
        }
    })
};
