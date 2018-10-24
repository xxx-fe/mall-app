const pageOther = async (ctx, _next) => {
    let locals = {
        title: 'other'
    };
    //appName开发模式下不会加载生产后的css
    ctx.state.appName = 'other-app';
    await ctx.render('pages/other-app/other', locals);
};

module.exports.default = module.exports = {
    pageOther
};
