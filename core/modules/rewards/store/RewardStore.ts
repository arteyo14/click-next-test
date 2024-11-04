import { RewardService, type IUserRedeemed } from "../infrastructure";

interface IState {
  loading: boolean;
  data: IUserRedeemed[];
}

export const useRewardStore = defineStore("reward", {
  state: (): IState => ({
    loading: false,
    data: [],
  }),
  actions: {
    async getUserRedeem(userId: number) {
      this.loading = true;

      const service = new RewardService();
      const res = await service.getUserRedeem(userId);

      this.loading = false;

      if (!res.status) {
        useHandlerError(res.code, res.error, { showAlert: true });
      } else {
        this.data = res.data;
      }
    },
  },
  getters: {},
});
