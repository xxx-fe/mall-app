const mainCtrl = require('../../controller/main-app');
module.exports.default = module.exports = [
    {path: '', ctrl: mainCtrl.pageHome},
    {path: 'main', ctrl: mainCtrl.pageHome},
    {path: 'main/list', ctrl: mainCtrl.list, method: 'post'}
];
