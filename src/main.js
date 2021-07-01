import Vue from 'vue';
import App from './App.vue';
// import { firstVariable, secondVariable } from './first';
// import alertFunction from './second';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

// alertFunction(firstVariable);
// alertFunction(secondVariable);
