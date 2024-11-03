import { HttpService, type IResponse } from "~/core/shared/http";
import type { IInitUser } from "./InitUserModel";

export class InitUserService extends HttpService {
  constructor() {
    super("/");
  }

  public initUser(): Promise<IResponse<IInitUser>> {
    return this.http
      .get(`/inituser`)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }
}
