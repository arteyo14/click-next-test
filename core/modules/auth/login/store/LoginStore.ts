import { LoginService, type ILoginRequest } from "../infrastructure";

interface IState {
  loading: boolean;
  username: string;
  password: string;
}

export const useLoginStore = defineStore("login", {
  state: (): IState => ({
    loading: false,
    username: "",
    password: "",
  }),
  actions: {
    async login() {
      this.loading = true;

      const params: ILoginRequest = {
        username: this.username,
        password: this.password,
      };

      //   const { LoginService } = await import("../infrastructure");
      const service = new LoginService();
      const res = await service.login(params);

      if (!res.status) {
        useHandlerError(res.code, res.error, { showAlert: true });
      } else {
        return res;
      }
    },
  },
  getters: {},
});
