import { IOrder } from './order.interface';
import Order from './order.model';

const createOrderService = async (order: IOrder) => {
  const result = await Order.create(order);
  return result;
};

const getAllOrderService = async (email?: string) => {
  let result;
  if (email) {
    result = await Order.find({ email });
  } else {
    result = await Order.find({});
  }
  return result;
};

export const OrderServices = {
  createOrderService,
  getAllOrderService,
};
