import '../setup';
import Vue from 'vue';

import Login from '../components/login.vue';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';

import '../vendor/main.css';
import '../vendor/util.css';
Vue.use(BootstrapVue);
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'current',
	messages: translations
})
document.addEventListener('DOMContentLoaded', () => {
  // console.log('loaded from faucet');
  const app = new Vue({
  	i18n,
    render: h => h(Login)
  }).$mount('#js-login');
})