import { createApp } from "vue";
import App from "~/App.vue";
import "./index.css";
import "bulma/css/bulma.css";

const app = createApp(App);

// pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

// router
import { router } from "~/router";
app.use(router);

app.mount("#app");
