import * as handlebar from './handlebars';
import {catchError} from './catch-error';
import {stateContext} from './state-context';

/**
 * middleware
 */
export const middleware = (app) => {
    app.use(handlebar.layouts);
    app.use(handlebar.rawHelper);
    app.use(catchError);
    app.use(stateContext);
};

