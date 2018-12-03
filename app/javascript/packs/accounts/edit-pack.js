import '../../setup';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import Edit from '../../components/accounts/edit.vue';
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'current',
	messages: translations
})
document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
  	i18n,
    render: h => h(Edit)
  }).$mount('#js-edit');
})