import koaSession from 'koa-session';
import yamlConfig from '../config/yaml';
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
    let redisStore = yamlConfig[process.env.NODE_ENV].redisStore;
    if (redisStore) {
        const koaRedis = require('koa-redis');
        CONFIG.store = koaRedis(redisStore);
    }
    app.use(koaSession(CONFIG, app));
};

