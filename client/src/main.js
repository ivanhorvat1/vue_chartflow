import Vue from "vue";
import App from "./App.vue";
import "./assets/css/drawflow.min.css";
import './assets/css/beautiful.css';
import './assets/css/all.min.css';
// import './assets/css/fonts.css';
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
