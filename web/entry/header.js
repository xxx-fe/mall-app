import Vue from 'vue';

global.Vue = Vue;
Vue.config.productionTip = false;

require('../global');
require('../vendor');

import 'minireset.css';
import '../styles/index.scss';

import * as filters from '../filters'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});
