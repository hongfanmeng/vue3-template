import { createRouter, createWebHistory } from "vue-router";
import routes from "virtual:generated-pages";
import { useAuthStore, AuthStatus } from "./stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const authStore = useAuthStore();
router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  console.log(to.fullPath);
  console.log(to.meta);
  if (to.meta.requiresAuth && authStore.authState != AuthStatus.AUTHED) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/backstage/login/",
      // save the location we were at to come back later
      query: { redirectTo: to.fullPath },
    };
  }
});

export { router };
