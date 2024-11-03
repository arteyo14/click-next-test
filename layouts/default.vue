<script lang="ts" setup>
import VHeader from "~/components/layouts/VHeader.vue";
import VFooter from "~/components/layouts/VFooter.vue";
</script>

<template>
  <div class="d-flex flex-column flex-root h-100">
    <VHeader />
    <div class="flex-fill container">
      <slot></slot>
    </div>
    <VFooter class="mt-auto" />
  </div>
</template>

<style lang="scss" scoped>
.flex-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh; // ทำให้ layout ครอบคลุมทั้งความสูงของ viewport
}

.flex-fill {
  flex: 1; // ให้ slot ของเนื้อหาเต็มพื้นที่ที่เหลือ
}

.mt-auto {
  margin-top: auto; // ให้ footer อยู่ด้านล่างสุด
}
</style>
