const page = require('../controller/index');
module.exports = [
    {path: '', ctrl: page.home},
    {path: 'home', ctrl: page.home},
    {path: 'test', ctrl: page.test},
    // {path: 'user/profile', ctrl: page.profile, method: 'post', isAuthenticated: true},
    // {path: 'captcha', ctrl: page.captcha, noContactToRoute: true},
];
