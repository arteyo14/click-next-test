<script setup lang="ts">
import { useProductStore } from "../store";

const store = useProductStore();
const route = useRoute();
const id = Number(route.params.id);
onMounted(() => {
  store.getProductDetails(id);
});

const canUseRewards = computed(() => {
  const initUser = useInitUser();

  return Number(initUser.points) < store.data.points_required;
});

onUnmounted(() => {
  store.$reset();
  store.$dispose();
});
</script>
<template>
  <div class="row">
    <div class="col-12 mt-4 mb-3">
      <h1>{{ store.data?.product?.name }}</h1>
    </div>
    <div class="col-12 text-center mb-4">
      <img
        :src="`/products/${store.data?.product?.image_url}`"
        :alt="`${store.data?.product?.name}-${store.data?.product?.image_url}`"
      />
    </div>
    <div class="col-12">
      <h4>รายละเอียด</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur facere
        est aliquam reprehenderit provident impedit, perspiciatis qui saepe at
        adipisci maxime non eaque, cupiditate fuga ullam porro nesciunt,
        voluptatibus quos?
      </p>
    </div>
    <div class="col-12 text-center">
      <p class="fw-bold border border-success border-2 rounded p-2">
        ใช้คะแนน Reward: {{ toNumber(store.data.points_required) }} คะแนน
      </p>
    </div>
    <div class="col-12 mb-3">
      <button
        class="btn btn-primary w-100 mb-2"
        :disabled="canUseRewards"
        :style="{
          background: canUseRewards ? '#d9d9d9 !important' : '',
          border: canUseRewards ? 'none !important' : '',
        }"
        @click="store.showConfirm(id)"
      >
        แลกสิทธิพิเศษ
      </button>
      <button class="btn btn-danger w-100" @click="navigateTo('/')">
        ย้อนกลับ
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@media (min-width: 768px) {
  img {
    width: 500px;
  }
}

@media (max-width: 768px) {
  img {
    max-width: 300px !important;
  }
}
</style>
