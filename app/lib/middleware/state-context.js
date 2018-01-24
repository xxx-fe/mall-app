/**
 * 状态上下文
 * 一般情况应该根据业务自定义
 */
export const stateContext = async (app) => {
    app.use(async (ctx, next) => {
        if (!ctx.session.user) {
            ctx.session.user = {}
        }
        if (!ctx.state.locale) {
            ctx.state.locale = 'en';
        }
        await next();
    });
    console.log('state-context initialized');
};
