const koaSession = require('koa-session');
/**
 * session
 */
module.exports.default = module.exports = (app) => {
    app.keys = ['keys'];
    const CONFIG = {
        key: 'koa:sess',
        //30 minutes
        maxAge: 1800000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false
    };
    let redisStore = app.context.redisStore;
    if (redisStore) {
        const koaRedis = require('koa-redis');
        CONFIG.store = koaRedis(redisStore);
    }

    app.use(koaSession(CONFIG, app));

};

