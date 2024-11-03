<script lang="ts" setup>
const inituser = useInitUser();
</script>
<template>
  <div
    class="d-flex justify-content-center align-items-center p-2 shadow-sm p-3 mb-5 bg-body rounded w-100"
  >
    <div
      class="d-flex justfy-content-center align-items-center border border-secondary p-2 rounded"
    >
      <span>{{ inituser.username }}: </span>
      <span class="ps-1"> {{ toNumber(Number(inituser.points)) }} points</span>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
