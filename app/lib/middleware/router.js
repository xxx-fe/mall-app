import path from 'path';
import koaRouter from 'koa-router';
import {readDirSync} from '../utils/read-dirsync';

/**
 * 路由
 */
export const router = (app) => {
    const basename = path.basename(module.filename);
    const thatRouter = koaRouter();
    readDirSync(path.join(path.resolve('./app/router')), function (fileName, isDirectory, dirPath) {
        let isJsFile = (dirPath.indexOf('.') !== 0) && (fileName !== basename) && (dirPath.slice(-3) === '.js');
        if (!isDirectory && isJsFile) {
            let dirRoute = require(dirPath);
            thatRouter.use(dirRoute.routes(), dirRoute.allowedMethods());
        }
    });
    app.use(thatRouter.routes(), thatRouter.allowedMethods());
};

