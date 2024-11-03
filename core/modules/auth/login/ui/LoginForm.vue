<script lang="ts" setup>
import { useForm } from "vee-validate";
import { useLoginStore } from "../store";
import { useInitUserStore } from "~/core/modules/initUser/store";
import { useAuthStore } from "../../authentication/store";

const store = useLoginStore();

const validatation = computed(() => {
  const validate: { [key: string]: string } = {};

  if (!store.username || store.username === "") {
    validate.username = "required";
  }

  return validate;
});

const { handleSubmit } = useForm({ validationSchema: validatation });

const onSubmit = handleSubmit(async (_, actions) => {
  useAction(actions);
  const res = await store.login();
  if (res?.status) {
    const authStore = useAuthStore();
    authStore.setToken(res.data.access_token, res.data.refresh_token);

    const initUserStore = useInitUserStore();
    await initUserStore.getInitUser();

    return navigateTo("/");
  }
});

onUnmounted(() => {
  store.$reset();
  store.$dispose();
});
</script>
<template>
  <form @submit="onSubmit" class="form p-4">
    <h3 class="text-center">เข้าสู่ระบบ</h3>
    <div class="row gap-2 my-4">
      <div class="col-12">
        <VTextInput
          v-model="store.username"
          label="ชื่อผู้ใช้"
          name="username"
          :required="true"
        />
      </div>
      <div class="col-12">
        <VPasswordInput
          v-model="store.password"
          label="รหัสผ่าน"
          name="password"
          :required="true"
        />
      </div>
    </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-12">
        <button class="btn btn-primary w-100">เข้าสู่ระบบ</button>
      </div>
    </div>
  </form>
</template>
<style lang="scss" scoped></style>
