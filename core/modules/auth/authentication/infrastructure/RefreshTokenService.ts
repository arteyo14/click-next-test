import { HttpService } from "~/core/shared/http";
import type { IRequestRefreshToken } from "./RefreshTokenRequest.d";
import type { IRefreshToken } from "./RefreshTokenModel.d";
import type { IResponse } from "~/core/shared/http/Response.d";

export class RefreshTokenService extends HttpService {
  constructor() {
    super("/");
  }

  public refreshToken(
    params: IRequestRefreshToken
  ): Promise<IResponse<IRefreshToken>> {
    return this.http
      .post(`/auth/refreshtoken`, params)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }
}
