<script lang="ts" setup>
import type { IUserRedeemed } from "../infrastructure";

defineProps({
  redeemed: {
    type: Array<IUserRedeemed>,
    defautl: [],
  },
});
</script>
<template>
  <div class="row">
    <div class="col-12">
      <h5>ประวัติการใช้ points</h5>
    </div>
    <ul v-if="redeemed?.length" class="col-12 ps-4">
      <li v-for="(item, index) of redeemed" :key="index">
        <p>
          {{
            `${index + 1}. ${buddhistFormatDate(
              item.redeemed_at,
              "dd mmm yyyy  (เวลา HH:ii น.)"
            )}: ${toNumber(item.used_points)} คะแนน`
          }}
        </p>
      </li>
    </ul>
    <div v-else class="col-12 mt-4">
      <p class="fs-6 text-center" style="color: #8080806e">
        ยังไม่มีประวัติการใช้ points
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
li {
  list-style-type: none;
}
</style>
