import '../../style/index.scss';

global.jQuery = global.$ = require('jquery');
require('jquery-lazyload');

import Vue from 'vue';
global.Vue = Vue;

Vue.config.productionTip = false;
require('../utils/index');

require('../vendor/axios');