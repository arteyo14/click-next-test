import { InitUserService, type IInitUser } from "../infrastructure";

interface IState {
  user: IInitUser;
}

export const useInitUserStore = defineStore("init-user", {
  state: (): IState => ({
    user: {} as IInitUser,
  }),
  actions: {
    async getInitUser() {
      const service = new InitUserService();
      const res = await service.initUser();

      if (!res.status) {
        useHandlerError(res.code, res.error, { showAlert: true });
      } else {
        this.user = res.data;
      }
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
});
