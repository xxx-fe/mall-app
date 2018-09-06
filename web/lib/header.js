import '../style/index.scss';

import Vue from 'vue';
global.Vue = Vue;

Vue.config.productionTip = false;

require('./utils/index');
require('./vendor/index');
