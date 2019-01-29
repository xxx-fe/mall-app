class commonPage {
    async notFound(ctx, _next) {
        let locals = {
            title: '404'
        };
        await ctx.render('pages/404', locals);
    }
}

module.exports = new commonPage();