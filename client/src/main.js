import Vue from "vue";
import App from "./App.vue";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import "font-awesome/css/font-awesome.min.css";
import vmodal from 'vue-js-modal';
import "./assets/css/drawflow.min.css";
import './assets/css/beautiful.css';
import './assets/css/all.min.css';
// import './assets/css/fonts.css';

Vue.use(vmodal);
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);

// library.add(faUserSecret);
// Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;


new Vue({
  render: (h) => h(App),
}).$mount("#app");
