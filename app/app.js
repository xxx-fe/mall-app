const Koa = require('koa');
const middleware = require('./lib/middleware/index');
const setContext = require('./lib/set-context');
const app = new Koa();

middleware.logger(app);

setContext(app);

middleware.helmet(app);

middleware.bodyParser(app);

middleware.session(app);

middleware.handlebars(app);

middleware.catchError(app);

middleware.view(app);

middleware.staticServe(app);

middleware.stateContext(app);

middleware.router(app);

middleware.webpack(app);

middleware.proxy(app);

middleware.listen(app);

