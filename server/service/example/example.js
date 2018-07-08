module.exports.default = module.exports  = {
    getList(ctx) {
        return ctx.axios(ctx, {url: '/example/list', method: 'post'});
    }
};