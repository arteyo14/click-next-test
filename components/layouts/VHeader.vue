<script lang="ts" setup>
const inituser = useInitUser();
</script>
<template>
  <div
    class="d-flex justify-content-between align-items-center p-2 shadow-sm p-3 mb-5 bg-body rounded w-100"
  >
    <div class="d-flex justfy-content-center align-items-center">
      <h3>Click Next Reward Test</h3>
    </div>
    <div
      class="d-flex justfy-content-center align-items-center border border-secondary p-2 rounded"
    >
      <div class="d-flex align-items-center me-2">
        <i class="fi fi-sr-circle-user fs-4 pt-1"></i>
      </div>
      <div>
        <span>{{ inituser.username }}: </span>
        <span class="ps-1">
          {{
            isNaN(Number(inituser.points))
              ? 0
              : toNumber(Number(inituser.points))
          }}
          points</span
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
