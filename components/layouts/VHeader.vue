<script lang="ts" setup>
import { useInitUserStore } from "~/core/modules/initUser/store";

const store = useInitUserStore();
</script>
<template>
  <div
    class="d-flex justify-content-between align-items-center p-2 shadow-sm p-3 mb-2 bg-body rounded w-100"
  >
    <div class="d-flex justfy-content-center align-items-center">
      <h3>Reward Test</h3>
    </div>
    <div
      class="d-flex justfy-content-center align-items-center border border-secondary p-2 rounded"
    >
      <div class="d-flex align-items-center me-2">
        <i class="fi fi-sr-circle-user fs-4 pt-1"></i>
      </div>
      <div>
        <span>{{ store.user.username }}: </span>
        <span class="ps-1">
          {{
            isNaN(Number(store.getUser?.points))
              ? 0
              : toNumber(Number(store.getUser?.points))
          }}
          points</span
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
