import { createRouter, createWebHistory } from "vue-router";
import ActiveClients from "../pages/ActiveClients.vue";
import ArchivedClients from "../pages/ArchivedClient.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: ActiveClients },
    { path: "/archived", component: ArchivedClients },
  ],
});
