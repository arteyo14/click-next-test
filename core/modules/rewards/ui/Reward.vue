<script lang="ts" setup>
import { useRewardStore } from "../store";
import RewardHistory from "./RewardHistory.vue";
import RewardUserCard from "./RewardUserCard.vue";

const store = useRewardStore();
const initUser = useInitUser();

onMounted(() => {
  store.getUserRedeem(Number(initUser.id));
});

onUnmounted(() => {
  store.$reset();
  store.$dispose();
});
</script>
<template>
  <div class="row">
    <div class="col-12">
      <h1>Reward</h1>
    </div>
    <div class="col-12">
      <RewardUserCard />
    </div>
    <div class="col-12 mt-4">
      <RewardHistory :redeemed="store.data" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
