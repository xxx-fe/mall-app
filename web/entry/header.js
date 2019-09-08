import Vue from 'vue';

global.Vue = Vue;
Vue.config.productionTip = false;

import '../icons'

require('../global');

import 'minireset.css';
import '../styles/index.scss';

if (APPSTATE.isMockAPI) {
    require('../mock');
}
import * as filters from '../filters'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

import {mixins} from '../mixins'
Vue.mixin(mixins);
