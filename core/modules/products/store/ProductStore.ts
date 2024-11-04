import {
  ProductService,
  type IProductRequest,
  type IRewardDetails,
} from "../infrastructure";

interface IState {
  loading: boolean;
  data: IRewardDetails;
}

export const useProductStore = defineStore("productStore", {
  state: (): IState => ({
    loading: false,
    data: {} as IRewardDetails,
  }),
  actions: {
    async getProductDetails(id: number) {
      this.loading = true;

      const service = new ProductService();
      const res = await service.getProductsDetails(id);

      if (!res.status) {
        useHandlerError(res.code, res.error, { showAlert: true });
      } else {
        this.data = res.data;
      }
    },
    async updateUserPoints(id: number) {
      this.loading = true;

      const params: IProductRequest = {
        user_id: Number(useInitUser().id),
        reward_id: this.data.id,
        used_point: this.data.points_required,
      };

      const service = new ProductService();
      const res = await service.updateUserPoints(id, params);

      this.loading = false;

      if (!res.status) {
        useHandlerError(res.code, res.error, { showAlert: true });
      } else {
        return res;
      }
    },
    showConfirm(id: number) {
      const { $swal }: any = useNuxtApp();
      $swal
        .fire({
          html: `<div class="d-flex flex-column align-items-center gap-5">
                      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#F1416C"/>
                <path d="M24.668 42H18.5459C18.245 41.9993 18.0012 41.7556 18.0005 41.4547V18.5453C18.0012 18.2444 18.245 18.0007 18.5459 18H24.668C25.7727 18 26.6682 17.1046 26.6682 16C26.6682 14.8954 25.7727 14 24.668 14H18.5459C16.0364 14.0029 14.0029 16.0362 14 18.5453V41.4546C14.0029 43.9637 16.0364 45.9971 18.5459 46H24.668C25.7727 46 26.6682 45.1046 26.6682 44C26.6682 42.8954 25.7727 42 24.668 42Z" fill="white"/>
                <path d="M44.2464 25.7575L39.0698 20.5855C38.2884 19.8046 37.0218 19.8049 36.2407 20.5862C35.4597 21.3675 35.46 22.6339 36.2414 23.4149L40.7913 27.9629L22.6677 28.0002C21.563 28.0002 20.6675 28.8956 20.6675 30.0002C20.6675 31.1048 21.563 32.0002 22.6677 32.0002L40.8647 31.9669L36.2414 36.5896C35.4887 37.3981 35.534 38.6636 36.3426 39.4162C37.1111 40.1315 38.3019 40.1309 39.0698 39.4149L44.2424 34.2429C46.5859 31.8997 46.5859 28.1008 44.2425 25.7576L44.2424 25.7576L44.2464 25.7575Z" fill="white"/>
                </svg>
                      <span class="text-gray-800 fw-bold fs-3">สิทธิพิเศษ</span>
                      <span class="text-gray-800 fw-normal fs-5">ยืนยันการแลกคะแนนสิทธิพิเศษ</span>
                  </div>`,
          showCancelButton: true,
          confirmButtonColor: "#F1416C",
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        })
        .then(async (result: any) => {
          if (result.isConfirmed) {
            const res = await this.updateUserPoints(id);

            if (res.status) {
              useHandlerSuccess(res.code, { showAlert: true });
            }
          }
        });
    },
  },
  getters: {},
});
