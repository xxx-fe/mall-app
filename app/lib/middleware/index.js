import {session} from './session';
import {catchError} from './catch-error';
import {handlebarsHelper} from './handlebars-helper';
import {proxy} from './proxy';
import {router} from './router';
import {webpack} from './webpack';
import {listen} from './listen';
import {view} from './view';
import {staticServe} from './static-serve';
import {bodyParser} from './body-parser';
import {logger} from './logger';
import {helmet} from './helmet';
module.exports.default = module.exports = {
    session,
    catchError,
    handlebarsHelper,
    proxy,
    router,
    webpack,
    listen,
    view,
    staticServe,
    bodyParser,
    logger,
    helmet
};
