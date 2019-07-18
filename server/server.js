const Koa = require('koa');
const middleware = require('./lib/middleware/index');
const context = require('./lib/context/index');
const server = new Koa();

context(server);

middleware.logger(server);

middleware.helmet(server);

middleware.bodyParser(server);

middleware.session(server);

middleware.handlebars(server);

middleware.catchError(server);

middleware.view(server);

middleware.staticServe(server);

middleware.stateContext(server);

middleware.router(server);

middleware.webpack(server);

middleware.proxy(server);

middleware.listen(server);
