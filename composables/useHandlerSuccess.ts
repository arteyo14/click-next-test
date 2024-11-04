import type { ICallback } from "~/core/shared/types/Callback";
import httpStatusCode from "~~/core/shared/http/HttpStatusCode";

const useHandlerSuccess = (
  statusCode: number,
  callback: ICallback = { showAlert: false }
) => {
  const options = reactive({
    title: "",
    message: "",
    type: "success" as TIcon,
  });

  switch (statusCode) {
    case httpStatusCode.OK: {
      options.title = "ทำรายการสำเร็จ";
      options.type = "success";
      break;
    }
    case httpStatusCode.CREATED: {
      options.title = "บันทึกข้อมูลสำเร็จ";
      options.type = "success";
      break;
    }
    case httpStatusCode.ACCEPTED: {
      options.title = "แก้ไขข้อมูลสำเร็จ";
      options.type = "success";
      break;
    }
    case httpStatusCode.DELETED: {
      options.title = "ลบข้อมูลสำเร็จ";
      options.type = "success";
      break;
    }
    default: {
      options.title = "สำเร็จ !";
      options.type = "success";
      break;
    }
  }

  // กรณีแสดง Swal
  if (callback.showAlert) {
    showAlert({
      title: options.title,
      message: options.message,
      type: options.type,
      callBack: callback.fn,
    });
  }

  // กรณีมี function
  if (!callback.showAlert && callback.fn) {
    return callback.fn();
  }

  // กรณีให้ Redirect
  if (!callback.showAlert && callback.to) {
    return navigateTo(callback.to);
  }
};

export default useHandlerSuccess;
