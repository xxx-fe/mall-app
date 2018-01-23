/**
 * 状态上下文
 * 一般情况应该根据业务自定义
 */
export const stateContext = async (app) => {
    app.use(async (ctx, next) => {
        if (!ctx.session.user) {
            ctx.session.user = {}
            if (ctx.lang) {
                ctx.session.user.lang = 'en';
            }
        }
        await next();
    })
    console.log('state-context initialized');
};
