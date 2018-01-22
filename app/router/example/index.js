import exampleCtrl from '../../controller/example/index';
import {addRouter} from '../../common/add-router';

let router = addRouter(function (router) {
    router.get('', exampleCtrl.index);
    router.get('example', exampleCtrl.index);
    router.post('example/list', exampleCtrl.list);
});

module.exports = router;
