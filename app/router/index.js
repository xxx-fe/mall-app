/**
 * 路由
 */
import {addRouter} from '../common/add-router';
import error from '../controller/common/error';

let router = addRouter(function (router) {
    router.get('error', error.index);
});

module.exports = router;
