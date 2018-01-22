import Koa from 'koa';
import appConfig from './config/index';

const app = new Koa();

appConfig.context(app);

appConfig.session(app);

appConfig.middleware(app);

appConfig.view(app);

appConfig.router(app);

appConfig.webpack(app);

appConfig.proxy(app);

appConfig.listen(app);

