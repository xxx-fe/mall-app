import Router from 'koa-router';
import exampleApp from '../controller/example-app';
const router = Router({
    prefix: '/'
});
router.get('', exampleApp.index);
router.get('example-app', exampleApp.index);
router.post('exampleList', exampleApp.exampleList);
module.exports = router;
