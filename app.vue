<script lang="ts" setup>
import { useAuthStore } from "./core/modules/auth/authentication/store";
import { useInitUserStore } from "./core/modules/initUser/store";

onBeforeMount(() => {
  // Auto refresh JWT Token
  const authStore = useAuthStore();

  // subscribe
  if (authStore.isLoggedIn === true) {
    authStore.subscribeStore();

    authStore.autoRefresh().then(async () => {
      // // Init User
      const initUserStore = useInitUserStore();
      await initUserStore.getInitUser();
    });
  }
});
</script>

<template>
  <div class="page">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style lang="scss" scoped>
div.page {
  height: 100vh;
}
</style>
