import Router from 'koa-router';
import {render404} from './render-404';

let allRouter = [];

/**
 * 保存全部路由
 */
function saveAllRouter(router) {
    router.stack.map(function (item) {
        let path = item.path;
        if (path) {
            if (!allRouter.includes(path) && path !== '/(.*)') {
                allRouter.push(path);
            }
        }
    });
}

/**
 * 是否正确路由
 */
const isValidUrl = (url) => {
    let isCollectUrl = false;
    for (let i = 0; i < allRouter.length; i++) {
        let item = allRouter[i];
        if (url.indexOf(item) === 0) {
            isCollectUrl = true;
            break;
        }
    }
    return isCollectUrl;
};

/**
 * 检查路由
 */
const checkUrl = async (ctx, next) => {
    let url = ctx.url;
    let split = url.split('/');
    let urlLangPrefix = ctx.config.urlLangPrefix;
    //多语言url
    if (urlLangPrefix && split.length > 2) {
        let splitUrl = split[1];
        //是否包含正确的多语言前缀url
        if (urlLangPrefix.includes(splitUrl)) {
            //删除正确的多语言url,还原为真实的url,并验证这个真实的url
            let replaceUrl = url.replace(ctx.urlLangRegExp, '').replace(/\/$/, '');
            console.log(replaceUrl);
            console.log(isValidUrl(replaceUrl));
            if (isValidUrl(replaceUrl)) {
                await next();
            }
            else {
                await render404(ctx);
            }
        }
        else {
            if (isValidUrl(url)) {
                await next();
            }
            else {
                await render404(ctx);
            }
        }
    }
    //一般url
    else {
        if (isValidUrl(url)) {
            await next();
        }
        else {
            await render404(ctx);
        }
    }
};

/**
 * 添加路由
 */
export const addRouter = (router) => {
    const koaRouter = Router({
        prefix: '/'
    });
    koaRouter.use(checkUrl);
    if (typeof router === 'function') {
        router(koaRouter);
    }
    saveAllRouter(koaRouter);
    return koaRouter;
};
