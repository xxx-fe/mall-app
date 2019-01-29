const api = require('../api/index');
class page {
    async home(ctx, _next) {
        let locals = {
            title: 'home-page'
        };
        await ctx.render('pages/home', locals);
    }

    async list(ctx, _next) {
        let locals = {
            list: await api.getList(ctx)
        };
        ctx.body = locals;
    }
}

module.exports = new page();
