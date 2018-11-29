module.exports.default = module.exports  = {
    getList(ctx) {
        return ctx.axios(ctx, {url: '/api/list', method: 'post'});
    }
};
