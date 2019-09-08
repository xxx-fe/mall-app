const pathToRegexp = require('path-to-regexp');
const isEmpty = require('lodash/isEmpty');
/**
 * 状态上下文
 */
module.exports.default = module.exports = async (app) => {
    app.use(async (ctx, next) => {
        for (let i = 0; i < app.context.router.length; i++) {
            let routerItem = app.context.router[i];
            //匹配不带/api的页面路由
            let matchPageRoute = !isEmpty(pathToRegexp(routerItem.path).exec(ctx.path));
            if (matchPageRoute) {
                app.context.setState(ctx);
                //用户设定
                ctx.state.user = ctx.session.user || '';
                ctx.state.isLogin = false;
                if (isEmpty(ctx.session.user)) {
                    //用户信息接口逻辑
                } else {
                    ctx.state.isLogin = true;
                }

                //路由权限判断
                if (routerItem.isAuthenticated) {
                    // if (!ctx.state.isLogin) {
                    //     ctx.redirect('/login');
                    // }
                }
                break;
            }
        }
        await next();
    });
    app.context.logger.info('state-context initialized');
};

