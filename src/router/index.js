import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Market";
import Basket from "../views/Basket/Basket";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/basket",
    name: "Basket",
    component: Basket,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  hash: false,
  routes,
});

export default router;
