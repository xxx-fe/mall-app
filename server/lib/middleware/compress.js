const compress = require('koa-compress');
/**
 * koa-compress
 */
module.exports.default = module.exports = async (app) => {
    app.use(compress({
        //只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
        filter: function (content_type) {
            return /text/i.test(content_type);
        },
        //阀值，当数据超过2kb的时候，可以压缩
        threshold: 2048,
        flush: require('zlib').Z_SYNC_FLUSH
    }));

    app.use(async(ctx, next) => {
        ctx.compress = true;
        await next();
    })
};
