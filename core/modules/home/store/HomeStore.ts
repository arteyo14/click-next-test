import { HomeService, type IProducts } from "../infrastructure";

interface IState {
  loading: boolean;
  products: IProducts[];
}

export const useHomeStore = defineStore("home", {
  state: (): IState => ({
    loading: false,
    products: [],
  }),
  actions: {
    async getProducts() {
      this.loading = true;

      const service = new HomeService();
      const res = await service.getProducts();

      this.loading = false;

      if (!res.status) {
        useHandlerError(res.code, res.error, { showAlert: true });
      } else {
        this.products = res.data;
      }
    },
  },
  getters: {},
});
