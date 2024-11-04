export interface IUserRedeemed {
  id: number;
  user_id: number;
  reward_id: number;
  product_id: number;
  used_points: number;
  redeemed_at: Date;
}
