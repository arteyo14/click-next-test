import { HttpService, type IResponse } from "~/core/shared/http";
import type { IRequestLogin } from "./LoginRequest";

export class LoginService extends HttpService {
  constructor() {
    super("/");
  }

  public async login(params: IRequestLogin): Promise<IResponse<{}>> {
    return this.http
      .post(`/auth/login`, params)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }
}
