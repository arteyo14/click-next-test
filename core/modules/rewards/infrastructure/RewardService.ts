import { HttpService, type IResponse } from "~/core/shared/http";
import type { IUserRedeemed } from "./RewardModels";

export class RewardService extends HttpService {
  constructor() {
    super("/");
  }

  public getUserRedeem(userId: number): Promise<IResponse<IUserRedeemed[]>> {
    return this.http
      .get(`redeem/${userId}`)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }
}
