const mainCtrl = require('../controller/index');
module.exports.default = module.exports = [
    {path: '', ctrl: mainCtrl.pageHome},
    {path: 'main', ctrl: mainCtrl.pageHome},
    {path: 'api/list', ctrl: mainCtrl.list, method: 'post'}
];
