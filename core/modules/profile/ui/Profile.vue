<script lang="ts" setup></script>
<template>
  <div class="row text-center">
    <h1 class="text-center">PROFILE</h1>
    <div
      class="col-12 text-center justify-content-center align-items-center my-1"
    >
      <i class="fi fi-sr-circle-user" style="font-size: 10rem"></i>
    </div>
    <div class="col-12 mb-2">
      <span class="mb-1">username: {{ useInitUser().username }}</span>
    </div>
    <div class="col-12">
      <span>Total Points: {{ toNumber(Number(useInitUser().points)) }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fi-sr-circle-user {
  color: #8080806e !important;
  line-height: 1.2;
}
</style>
