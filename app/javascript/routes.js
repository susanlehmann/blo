import Vue from 'vue';
import VueRouter from 'vue-router';

import UserPage from './components/user-page.vue';
import Messages from './components/message.vue';
import message_list from './components/messages-list.vue';
import homepage from './components/message-body.vue';
import message_page from './components/message-page';
Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: '${I18n.prefix}',
	routes: [
		{ path: '/u/:id', component: UserPage, name: 'userpage_path'}
	]
});

export default router;