<script lang="ts" setup>
import { useAuthStore } from "../../auth/authentication/store";

const authStore = useAuthStore();

const onLogout = () => {
  const { $swal }: any = useNuxtApp();
  $swal
    .fire({
      html: `<div class="d-flex flex-column align-items-center gap-5">
			<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="30" fill="#F1416C"/>
      <path d="M24.668 42H18.5459C18.245 41.9993 18.0012 41.7556 18.0005 41.4547V18.5453C18.0012 18.2444 18.245 18.0007 18.5459 18H24.668C25.7727 18 26.6682 17.1046 26.6682 16C26.6682 14.8954 25.7727 14 24.668 14H18.5459C16.0364 14.0029 14.0029 16.0362 14 18.5453V41.4546C14.0029 43.9637 16.0364 45.9971 18.5459 46H24.668C25.7727 46 26.6682 45.1046 26.6682 44C26.6682 42.8954 25.7727 42 24.668 42Z" fill="white"/>
      <path d="M44.2464 25.7575L39.0698 20.5855C38.2884 19.8046 37.0218 19.8049 36.2407 20.5862C35.4597 21.3675 35.46 22.6339 36.2414 23.4149L40.7913 27.9629L22.6677 28.0002C21.563 28.0002 20.6675 28.8956 20.6675 30.0002C20.6675 31.1048 21.563 32.0002 22.6677 32.0002L40.8647 31.9669L36.2414 36.5896C35.4887 37.3981 35.534 38.6636 36.3426 39.4162C37.1111 40.1315 38.3019 40.1309 39.0698 39.4149L44.2424 34.2429C46.5859 31.8997 46.5859 28.1008 44.2425 25.7576L44.2424 25.7576L44.2464 25.7575Z" fill="white"/>
      </svg>
			<span class="text-gray-800 fw-bold fs-3">ออกจากระบบ</span>
			<span class="text-gray-800 fw-normal fs-5">ยืนยันการออกจากระบบ</span>
		</div>`,
      showCancelButton: true,
      confirmButtonColor: "#F1416C",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        const store = useAuthStore();
        store.logout();
      }
    });
};
</script>
<template>
  <div
    class="d-flex flex-column justify-content-between align-items-center h-100"
  >
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
    <div class="row mb-4">
      <div class="col-12">
        <button class="btn btn-danger" @click="onLogout">ออกจากระบบ</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fi-sr-circle-user {
  color: #8080806e !important;
  line-height: 1.2;
}
</style>
