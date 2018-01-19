import Router from 'koa-router';
import exampleCtrl from '../../controller/example/index';

const router = Router({
    prefix: '/'
});
router.get('', exampleCtrl.index);
router.get('example', exampleCtrl.index);
router.post('example/list', exampleCtrl.list);
module.exports = router;
