import koaHelmet from 'koa-helmet'

/**
 * 头盔
 * 安全性
 */
export const helmet = async (app) => {
    app.use(koaHelmet());
};
