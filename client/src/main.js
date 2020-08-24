import Vue from "vue";
import App from "./App.vue";
import vmodal from 'vue-js-modal'
import "./assets/css/drawflow.min.css";
import './assets/css/beautiful.css';
import './assets/css/all.min.css';
// import './assets/css/fonts.css';
Vue.config.productionTip = false;

Vue.use(vmodal)

new Vue({
  render: (h) => h(App),
}).$mount("#app");
