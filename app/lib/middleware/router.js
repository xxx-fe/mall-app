let path = require('path');
let koaRouter = require('koa-router');
let readDirSync = require('../utils/read-dirsync');
let allPartRouter = [];
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
    readDirSync(path.join(path.resolve('./app/router')), function (fileName, isDirectory, dirPath) {
        let isJsFile = (dirPath.indexOf('.') !== 0) && (fileName !== basename) && (dirPath.slice(-3) === '.js');
        if (!isDirectory && isJsFile) {
            let partRouter = require(dirPath);
            allPartRouter = allPartRouter.concat(partRouter);
        }
    });

    allPartRouter.forEach(function (item) {
        var method = item.method || 'get';
        router[item.method || 'get'](`${app.context.urlLocalesRegExp}${item.path}`, item.ctrl);
    });

    console.log(`app.context.urlLocalesRegExp: ${app.context.urlLocalesRegExp}`);

    app.use(router.routes(), router.allowedMethods());

    console.log('router initialized');
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
