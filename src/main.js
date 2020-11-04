import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import Vuetify from 'vuetify'


import router from './router/router';

import { formatDate, formatTime } from './utils/filters';

Vue.config.productionTip = false

Vue.use( VueToast );
Vue.use( Vuetify );
Vue.filter( 'formatDate', formatDate );
Vue.filter( 'formatTime', formatTime );

new Vue({
  vuetify: new Vuetify( { icons: { iconfont: 'mdiSvg' } } ),
  router,
  render: h => h(App),
}).$mount('#app')
