export type TIcon = "success" | "error" | "warning" | "info" | "question";

export interface ISwal {
  title?: string;
  message?: string;
  html?: string;
  type?: TIcon;
  callBack?(): void;
}

export const showAlert = (options: ISwal): void => {
  const { $swal }: any = useNuxtApp();

  $swal
    .fire({
      title: options.title,
      icon: options.type,
      text: options.message,
      html: options.html,
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#FDB833",
      showCancelButton: options.type === "question",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true,
    })
    .then((result: any) => {
      if (options.type === "question") {
        if (result.isConfirmed) {
          if (options.callBack !== undefined) {
            options.callBack();
          }
        }
      } else if (options.callBack !== undefined) {
        options.callBack();
      }
    });
};
