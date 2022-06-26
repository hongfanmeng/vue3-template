<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

const redirect = async () => {
  await router.push("/login");
};

onMounted(() => {
  redirect();
});
</script>

<template></template>
