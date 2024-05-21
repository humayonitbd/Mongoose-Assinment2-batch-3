import { Request, Response } from 'express';
import OrderValidationSchema from './order.validationSchema';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { data: orderData } = req.body;

    const zodParseData = OrderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderService(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email?: string };

    const result = await OrderServices.getAllOrderService(email);

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
