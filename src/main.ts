import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/iview.js';
import './plugins/axios.js';

Vue.config.productionTip = false;
window.document.title = "3D播放器在线授权中心";

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('currentUser_token')
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


