/**
 * 错误页面
 */
const index = async (ctx, next) => {
    let locals = {
        title: 'error'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'error';
    await ctx.render('common/error', locals);
};

module.exports.default = module.exports  = {
    index
};
