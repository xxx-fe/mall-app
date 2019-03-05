let path = require('path');
let koaRouter = require('koa-router');
let readDirSync = require('../utils/read-dirsync');
let allPartRouter = [];
const isEmpty = require('lodash/isEmpty');
/**
 * 路由
 */
module.exports.default = module.exports = async (app) => {
    const basename = path.basename(module.filename);
    const router = koaRouter({
        prefix: '/'
    });

    router.use(checkLocale);

    //遍历所有路由
    readDirSync(path.join(path.resolve('./server/router')), function (fileName, isDirectory, dirPath) {
        let isJsFile = (dirPath.indexOf('.') !== 0) && (fileName !== basename) && (dirPath.slice(-3) === '.js');
        if (!isDirectory && isJsFile) {
            let partRouter = require(dirPath);
            allPartRouter = allPartRouter.concat(partRouter);
        }
    });

    allPartRouter.forEach(function (item) {
        router[item.method || 'get'](`${app.context.urlLocalesRegExp}${item.path}`, item.ctrl);
    });

    //保存所有非api路由
    if (!isEmpty(allPartRouter)) {
        app.context.router = allPartRouter.filter(function (item) {
            if (item.path.indexOf('api') === -1 && !item.noContactToRoute)
                return item;
        });

        app.context.router = app.context.router.map(function (item) {
            item.path = '/' + item.path;
            return item;
        });
    }

    app.context.logger.info(`app.context.urlLocalesRegExp: ${app.context.urlLocalesRegExp}`);

    app.use(router.routes(), router.allowedMethods());

    app.context.logger.info('router initialized');
};

/**
 * 检查多语言
 */
const checkLocale = async (ctx, next) => {
    let split = ctx.request.originalUrl.split('/')[1];
    if (ctx.locales.includes(split)) {
        ctx.state.locale = split;
    }
    await next();
};
