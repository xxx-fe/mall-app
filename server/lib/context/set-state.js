/**
 * 设置通用状态
 */
module.exports = function setState(ctx) {
    if (!ctx.state.locale) {
        ctx.state.locale = 'zh';
        ctx.state.publicServer = ctx.publicServer || '';
        ctx.state.appName = ctx.appName || '';
    }
};
