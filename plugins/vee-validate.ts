import { Form, Field, ErrorMessage, FieldArray } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VForm", Form);
  nuxtApp.vueApp.component("VField", Field);
  nuxtApp.vueApp.component("VErrorMessage", ErrorMessage);
  nuxtApp.vueApp.component("VFieldArray", FieldArray);
});
