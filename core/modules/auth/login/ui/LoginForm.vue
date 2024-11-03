<script lang="ts" setup>
import { useForm } from "vee-validate";
import { useLoginStore } from "../store";

const store = useLoginStore();

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async (_, actions) => {
  useAction(actions);
  // const res = await store.login()
  //   if (res?.status) {
  //   }
});
</script>
<template>
  <form action="">
    <span>login Page </span>
  </form>
</template>
<style lang="scss" scoped></style>
