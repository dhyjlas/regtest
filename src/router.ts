import Vue from "vue";
import Router from "vue-router";

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
            name: "apply",
            meta: {
                title: '激活申请'
            },
            component: () => import('./views/apply.vue')
        },
        {
          path: '/applyInfo',
          name: "applyInfo",
          meta: {
              title: '申请信息'
          },
          component: () => import('./views/applyInfo.vue')
        }
    ]
    }
  ]
});
