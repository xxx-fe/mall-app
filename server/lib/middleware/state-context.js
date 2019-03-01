const pathToRegexp = require('path-to-regexp');
const isEmpty = require('lodash/isEmpty');
/**
 * 状态上下文
 */
module.exports.default = module.exports = async (app) => {
    app.use(async (ctx, next) => {
        //只对当前非api路由执行一次
        for (let i = 0; i < app.context.router.length; i++) {
            let item = app.context.router[i];
            let matchPageRoute = !isEmpty(pathToRegexp(item).exec(ctx.path));
            if (matchPageRoute) {
                if (!ctx.state.locale) {
                    ctx.state.locale = 'zh';
                    ctx.state.publicServer = ctx.publicServer || '';
                    ctx.state.appName = ctx.appName || '';
                }
                break;
            }
        }
        await next();
    });
    app.context.logger.info('state-context initialized');
};

