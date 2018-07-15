const exampleCtrl = require('../../controller/example/example');
module.exports.default = module.exports = [
    {path: '', ctrl: exampleCtrl.index},
    {path: 'example', ctrl: exampleCtrl.index},
    {path: 'example2', ctrl: exampleCtrl.index2},
    {path: 'example/list', ctrl: exampleCtrl.list, method: 'post'}
];
