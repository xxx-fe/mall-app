/**
 * 路由
 */
import path from 'path';
import Router from 'koa-router';
import {readDirSync} from '../common/read-dirsync';
const basename = path.basename(module.filename);
const router = Router();
readDirSync(path.join(__dirname, '../router/'), function (fileName, isDirectory, dirPath) {
    var isJsFile = (dirPath.indexOf('.') !== 0) && (fileName !== basename) && (dirPath.slice(-3) === '.js');
    if (!isDirectory && isJsFile) {
        var route = require(dirPath);
        router.use(route.routes(), route.allowedMethods());
    }
});
export default router;
