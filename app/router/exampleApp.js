import Router from 'koa-router';
import exampleApp from '../controller/exampleApp';
const router = Router({
    prefix: '/'
});
router.get('example-app', exampleApp.index);
module.exports = router;