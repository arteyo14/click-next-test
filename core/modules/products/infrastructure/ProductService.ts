import { HttpService, type IResponse } from "~/core/shared/http";
import type { IRewardDetails } from "./ProductModels";
import type { IProductRequest } from "./ProductRequest";

export class ProductService extends HttpService {
  constructor() {
    super("/");
  }

  public getProductsDetails(id: number): Promise<IResponse<IRewardDetails>> {
    return this.http
      .get(`rewards/${id}`)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }

  public updateUserPoints(id: number, params: IProductRequest) {
    return this.http
      .put(`/rewards/${id}`, params)
      .then(this.handleResponse.bind(this))
      .catch(this.handleError.bind(this));
  }
}
