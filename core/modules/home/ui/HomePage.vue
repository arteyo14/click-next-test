<script setup lang="ts">
import { useHomeStore } from "../store";
import HomeBanner from "./HomeBanner.vue";

const store = useHomeStore();

onMounted(() => {
  store.getProducts();
});

onUnmounted(() => {
  store.$reset();
  store.$dispose();
});
</script>
<template>
  <div class="row my-4">
    <div class="col-12">
      <h1 class="mb-1">สินค้า</h1>
      <HomeBanner :products="store.products" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
