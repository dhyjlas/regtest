import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import('./views/index.vue'),
      children: [
        {
            path: '/apply',
            meta: {
                title: '在线设备'
            },
            component: () => import('./views/apply.vue')
        }
    ]
    }
  ]
});
