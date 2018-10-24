module.exports.default = module.exports  = {
    getList(ctx) {
        return ctx.axios(ctx, {url: '/main/list', method: 'post'});
    }
};
