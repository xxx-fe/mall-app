import Router from 'koa-router';
import home from '../controller/home';

const router = Router({
    prefix: '/'
});

router.get('about', home.about);
router.get('/', home.index);

module.exports = router;
