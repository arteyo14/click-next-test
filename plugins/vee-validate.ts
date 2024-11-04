import {
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  defineRule,
  configure,
} from "vee-validate";
import allRules from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import th from "@vee-validate/i18n/dist/locale/th.json";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VForm", Form);
  nuxtApp.vueApp.component("VField", Field);
  nuxtApp.vueApp.component("VErrorMessage", ErrorMessage);
  nuxtApp.vueApp.component("VFieldArray", FieldArray);

  Object.keys(allRules).forEach((rule) => {
    defineRule(rule, allRules[rule]);
  });

  // Activate the locale
  localize({ th });

  configure({
    generateMessage: localize("th", {
      messages: {
        required: "โปรดระบุ",
      },
    }),
  });
});
