import {
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  defineRule,
  configure,
} from "vee-validate";
import { all } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import th from "@vee-validate/i18n/dist/locale/th.json";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VForm", Form);
  nuxtApp.vueApp.component("VField", Field);
  nuxtApp.vueApp.component("VErrorMessage", ErrorMessage);
  nuxtApp.vueApp.component("VFieldArray", FieldArray);

  Object.keys(all).forEach((rule) => {
    defineRule(rule, all[rule]);
  });

  // Activate the locale
  localize({ th });

  configure({
    generateMessage: localize("th", {
      messages: {
        required: "โปรดระบุ",
      },
    }),
    validateOnModelUpdate: true,
    validateOnInput: true,
  });
});
