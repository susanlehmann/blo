import '../setup';
import "babel-polyfill"

import Vue from 'vue'
import NewMessage from '../new-message.vue'
import EditMicroMessage from '../components/edit-micro-message.vue'
import VueI18n from 'vue-i18n';
import NavTop from '../components/shared/_nav_top';
import router from '../routes.js';
Vue.component('nav-top',NavTop);
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'current',
  messages: translations
})
document.addEventListener('DOMContentLoaded', () => {
  const articleEl = document.querySelector('#js-new-message');
  if (articleEl) {
    const data = articleEl.getAttribute('data');
    let message = null;
    if (data) {
      message = JSON.parse(data);
    }
    const app = new Vue({
      i18n,
      router,
      render: h => h(NewMessage, { props: { message: message } })
    }).$mount('#js-new-message');
  }

  const microEl = document.querySelector('#js-edit-message');
  if (microEl) {
    const data = microEl.getAttribute('data');
    let message = null;
    if (data) {
      message = JSON.parse(data);
    }
    const app = new Vue({
      i18n,
      router,
      render: h => h(EditMicroMessage, { props: { message: message } })
    }).$mount('#js-edit-message');
  }
  
})