import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
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
              title: '申请结果'
          },
          component: () => import('./views/applyInfo.vue')
        },
        {
          path: '/regList',
          name: "regList",
          meta: {
              title: '密钥列表'
          },
          component: () => import('./views/regList.vue')
        },
        {
          path: '/modify',
          name: "modify",
          meta: {
              title: '修改信息'
          },
          component: () => import('./views/modify.vue')
        },
        {
          path: '/activeList',
          name: "activeList",
          meta: {
              title: '设备列表'
          },
          component: () => import('./views/activeList.vue')
        },
        {
          path: '/test',
          name: "test",
          meta: {
              title: '测试页面'
          },
          component: () => import('./views/test.vue')
        }
    ]
    }
  ]
});
