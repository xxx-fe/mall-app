const page = require('../controller/index');
module.exports.default = module.exports = [
    {path: '', ctrl: page.home},
    {path: 'main', ctrl: page.home},
    {path: 'api/list', ctrl: page.list, method: 'post'}
];
