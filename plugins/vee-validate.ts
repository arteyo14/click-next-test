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
        alpha: "ต้องเป็นตัวอักษรเท่านั้น",
        alpha_dash:
          "สามารถมีตัวอักษร ตัวเลข เครื่องหมายขีดกลาง (-) และเครื่องหมายขีดล่าง (_)",
        alpha_num: "ต้องเป็นตัวอักษร และตัวเลขเท่านั้น",
        alpha_spaces: "ต้องเป็นตัวอักษร และช่องว่างเท่านั้น",
        between: "ต้องเป็นค่าระหว่าง 0:{min} และ 1:{max}",
        confirmed: "การยืนยันข้อมูลของ ไม่ตรงกัน",
        digits: "ต้องเป็นตัวเลขจำนวน 0:{length} หลักเท่านั้น",
        dimensions: "ต้องมีขนาด 0:{width}x{height} px",
        email: "ต้องเป็นรูปแบบอีเมล",
        not_one_of: "ต้องเป็นค่าที่กำหนดเท่านั้น",
        ext: "สกุลไฟล์ไม่ถูกต้อง",
        image: "ต้องเป็นรูปภาพเท่านั้น",
        one_of: "ต้องเป็นค่าที่กำหนดเท่านั้น",
        integer: "ต้องเป็นเลขจำนวนเต็ม",
        length: "ต้องมีความยาว 0:{length}",
        max: "ต้องมีความยาวไม่เกิน 0:{length} ตัวอักษร",
        max_value: "ต้องมีค่าไม่เกิน 0:{max}",
        mimes: "ประเภทไฟล์ไม่ถูกต้อง",
        min: "ต้องมีความยาวอย่างน้อย 0:{length} ตัวอักษร",
        min_value: "ต้องมีค่าตั้งแต่ 0:{min} ขึ้นไป",
        numeric: "ต้องเป็นตัวเลขเท่านั้น",
        regex: "รูปแบบ ไม่ถูกต้อง",
        required: "โปรดระบุ",
        required_if: "โปรดระบุ",
        size: "ต้องมีขนาดไฟล์ไม่เกิน 0:{size}KB",
      },
    }),
  });
});
