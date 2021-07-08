import Vue from 'vue'; // Импортируем Vue (из папки node_modules)
import App from './App.vue'; // Импортируем приложение App.vue (с именем App)

Vue.config.productionTip = false;

// Инициализируем Vue instance и крепим его к div c id "App" (в public/index.html)
new Vue({
  render: (h) => h(App),
}).$mount('#app');
