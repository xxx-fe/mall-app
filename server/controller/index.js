const api = require('../api/index');
class page {
    async home(ctx, _next) {
        let locals = {
            appId: 'home',
            title: 'home-page'
        };
        //按需加载下必填,否则可忽略.
        ctx.state.appKey = 'home/index';
        await ctx.render('pages/common', locals);
    }

    async list(ctx, _next) {
        let locals = {
            list: await api.getList(ctx)
        };
        ctx.body = locals;
    }
}

module.exports = new page();
