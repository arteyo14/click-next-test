<script setup lang="ts">
import type { IProducts } from "../infrastructure";

defineProps({
  products: {
    type: Array<IProducts>,
    default: [],
  },
});
</script>
<template>
  <div
    id="carouselExample"
    class="carousel slide"
    data-bs-ride="carousel"
    data-bs-interval="2000"
  >
    <!-- Indicators -->
    <div class="carousel-indicators">
      <button
        type="button"
        v-for="(item, index) in products"
        :key="index"
        :data-bs-target="'#carouselExample'"
        :data-bs-slide-to="index"
        :class="{ active: index === 0 }"
        :aria-label="'Slide ' + (index + 1)"
      ></button>
    </div>

    <!-- Carousel Items -->
    <div class="carousel-inner">
      <div
        class="carousel-item cursor-pointer"
        v-for="(item, index) in products"
        :key="index"
        :class="{ active: index === 0 }"
        @click="navigateTo(`/product/${item.id}`)"
      >
        <img
          :src="`products/${item.image_url}`"
          class="d-block w-100 carousel-image"
          :alt="'Slide ' + (index + 1)"
        />
      </div>
    </div>

    <!-- Controls (Previous & Next buttons) -->
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
<style lang="scss" scoped>
.carousel-image {
  object-fit: center; /* ครอบภาพให้เต็ม */
  height: 500px !important; /* กำหนดความสูงคงที่ */
}
</style>
