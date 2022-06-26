<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import { AuthStatus, useAuthStore } from "~/stores/auth";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const login = async () => {
  await authStore.loginWith(username.value, password.value);
  await router.push(
    route.query["redirectTo"] ? (route.query["redirectTo"] as string) : "/pages/home"
  );
};

const redirectIfLoggedIn = async () => {
  let authState: AuthStatus = authStore.authState;
  if (authState == AuthStatus.UNAUTHED) return;
  if (authState == AuthStatus.TIMEOUT) await authStore.refreshToken();
  await router.push(
    route.query["redirectTo"] ? (route.query["redirectTo"] as string) : "/pages/home"
  );
};

onMounted(() => {
  redirectIfLoggedIn();
});

const username: Ref<string> = ref("");
const password: Ref<string> = ref("");

onMounted(() => {
  username.value = "admin";
  password.value = "admin";
});
</script>

<template></template>

<style></style>
