import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages";
import { useAuthStore, AuthStatus } from "./stores/auth";

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  console.log(to.fullPath);
  if (to.meta.requiresAuth && authStore.authState != AuthStatus.AUTHED) {
    return {
      path: "/login/",
      query: { redirectTo: to.fullPath },
    };
  }
});

export { router };
