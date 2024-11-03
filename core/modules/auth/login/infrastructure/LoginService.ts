import { HttpService, type IResponse } from "~/core/shared/http";
import type { ILoginResponse } from "./LoginModels.d";
import type { ILoginRequest } from "./LoginRequest";

export class LoginService extends HttpService {
  constructor() {
    super("/");
  }

  public login(params: ILoginRequest): Promise<IResponse<ILoginResponse>> {
    console.log(params);
    return this.http
      .post("auth/login", params)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }
}
