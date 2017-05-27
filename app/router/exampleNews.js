import Router from 'koa-router';
import exampleNews from '../controller/exampleNews';
const router = Router({
    prefix: '/'
});
router.get('exampleNews', exampleNews.index);
module.exports = router;