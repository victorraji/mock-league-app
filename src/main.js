import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import Buefy from "buefy";

import "@mdi/font/css/materialdesignicons.min.css";
import "bulma-steps/dist/css/bulma-steps.min.css";
import "bulma-helpers/css/bulma-helpers.min.css";

import "vue-multiselect/dist/vue-multiselect.min.css";

Vue.config.productionTip = false
Vue.prototype.$baseUrl = 'api/'

Vue.use(Buefy);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')