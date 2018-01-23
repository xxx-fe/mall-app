/**
 * 状态上下文
 */
export const stateContext = async (ctx, next) => {
    await next();
};
