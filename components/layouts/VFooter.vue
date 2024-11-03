<script lang="ts" setup>
const menu = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Rewards", url: "/rewards" },
  { id: 3, name: "Profile", url: "/profile" },
];
</script>
<template>
  <div class="d-flex justify-content-center align-items-center mt-4">
    <ul
      class="d-flex justify-content-around align-items-center w-100 gap-4 ps-0 mb-0 bg-dark"
    >
      <NuxtLink
        class="menu-list p-2"
        v-for="(item, index) of menu"
        :key="index"
        :to="item.url"
      >
        {{ item.name }}
      </NuxtLink>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.bg-dark {
  background: #000 !important;
}

.menu-list {
  text-decoration: none;
  color: #fff;
  border: 1px solid #000;
}
</style>
