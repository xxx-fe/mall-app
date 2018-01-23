import KoaBodyParser from 'koa-bodyparser';

/**
 * bodyparser
 */
export const bodyParser = async (app) => {
    app.use(KoaBodyParser());
};
