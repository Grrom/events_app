import { createRouter, createWebHistory } from "vue-router";
import EventsView from "../views/EventsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Events",
      component: EventsView,
    },
    {
      path: "/addEvent",
      name: "addEvent",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AddEvent.vue"),
    },
    {
      path: "/events",
      name: "events",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/EventsView.vue"),
    },
  ],
});

export default router;
