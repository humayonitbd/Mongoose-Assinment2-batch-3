import { Types } from 'mongoose';

export type IOrder = {
  email: string;
  productId: Types.ObjectId;
  price: number;
  quantity: number;
};
