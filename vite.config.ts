import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/backstage/",
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  plugins: [
    vue(),
    Pages({
      extendRoute(route, parent) {
        if (route.path === "/backstage/login" || route.path === "/backstage") {
          return route;
        }

        // Augment the route with meta that indicates that the route requires authentication.
        return {
          ...route,
          meta: { requiresAuth: true },
        };
      },
    }),
  ],
});
