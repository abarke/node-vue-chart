import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/highcharts',
    name: 'highcharts',
    // route level code-splitting
    // this generates a separate chunk (chart.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "chart" */ '../views/HighCharts.vue'),
  },
];

const router = new VueRouter({
  routes
});

export default router;
