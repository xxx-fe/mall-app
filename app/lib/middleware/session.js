import koaSession from 'koa-session';

/**
 * session
 */
export const session = (app) => {
    app.keys = ['keys'];
    const CONFIG = {
        key: 'koa:sess',
        maxAge: 2000,
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

