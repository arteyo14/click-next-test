import { HttpService, type IResponse } from "~/core/shared/http";
import type { IProducts } from "./HomeModels";

export class HomeService extends HttpService {
  constructor() {
    super("/");
  }

  public getProducts(): Promise<IResponse<IProducts[]>> {
    return this.http
      .get("/products")
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }
}
