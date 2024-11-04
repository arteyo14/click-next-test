export interface IRewardDetails {
  id: number;
  product_id: number;
  points_required: number;
  description: string;
  expires_at: Date;
  product: IProduct;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  discounted_price: number;
}
