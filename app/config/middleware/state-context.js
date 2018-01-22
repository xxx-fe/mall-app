/**
 * 状态上下文
 */
export const stateContext = async (ctx, next) => {
    // console.log(11111111);
    // console.log(ctx.request.url);
    await next();
};
