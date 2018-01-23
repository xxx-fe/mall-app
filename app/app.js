import Koa from 'koa';
import middleware from './lib/middleware/index';
import {setContext} from './lib/set-context';

const app = new Koa();

setContext(app);

middleware.helmet(app);

middleware.logger(app);

middleware.bodyParser(app);

middleware.session(app);

middleware.handlebarsHelper(app);

middleware.catchError(app);

middleware.view(app);

middleware.router(app);

middleware.staticServe(app);

middleware.view(app);

middleware.webpack(app);

middleware.proxy(app);

middleware.listen(app);

