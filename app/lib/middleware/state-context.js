

/**
 * 状态上下文
 */
export const stateContext = async (app) => {
    app.use(async (ctx, next) => {
        await next();
    })
    console.log('state-context initialized');
};
