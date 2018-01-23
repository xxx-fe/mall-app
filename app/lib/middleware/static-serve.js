import path from 'path';
import serve from 'koa-static';
/**
 * 静态文件
 */
export const staticServe = async (app) => {
    app.use(serve(path.join(path.resolve('./'))));
    console.log('static-serve initialized');
};
