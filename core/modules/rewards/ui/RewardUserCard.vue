<script lang="ts" setup>
const initUser = useInitUser();
</script>
<template>
  <div class="card">
    <div class="row card-body align-items-center">
      <div class="col-6 text-center">
        <h1 class="mb-1">แต้มปัจจุบัน</h1>
        <h3>{{ initUser.points }} คะแนน</h3>
      </div>
      <div class="col-6 text-center">
        <i class="fi fi-sr-circle-user" style="font-size: 10rem"></i>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
