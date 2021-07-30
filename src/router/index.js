import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RequestPayment from "../views/RequestPayment.vue";
import ManagePayments from "../views/ManagePayments.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/RequestPayment",
    name: "RequestPayment",
    component: RequestPayment,
  },
  {
    path: "/ManagePayments",
    name: "ManagePayments",
    component: ManagePayments,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
