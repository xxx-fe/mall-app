/**
 * 状态上下文
 */
export const stateContext = async (ctx, next) => {
    console.log('state-context')
    await next();
};
