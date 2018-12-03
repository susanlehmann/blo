import '../setup';
import Vue from 'vue';

import MessagePage from '../components/message-page.vue';
import VueI18n from 'vue-i18n';
import NavTop from '../components/shared/_nav_top';
Vue.component('nav-top',NavTop);
import router from '../routes.js';

Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'current',
	messages: translations
})
document.addEventListener('DOMContentLoaded', () => {
  const json = document.getElementById('js-message').getAttribute('data');
  const data = JSON.parse(json);
  console.log(data);
  const app = new Vue({
  	i18n,
  	router,
    render: h => h(MessagePage, { props: { message: data } })
  }).$mount('#js-message');
})