import { Request, Response } from 'express';
import OrderValidationSchema from './order.validationSchema';
import { OrderServices } from './order.service';
import Product from '../product/product.model';
import getErrorMessage from '../../utils/getErrorMessage';

const createOrder = async (req: Request, res: Response) => {
  try {
    const  orderData = req.body;
    const zodParseData = OrderValidationSchema.parse(orderData);
    // Fetch the ordered product
    const product = await Product.findById(orderData.productId);
    if (!product) {
      throw new Error('Product not found');
    }
    // Check if the ordered quantity exceeds the available quantity
    if (orderData.quantity > product.inventory.quantity) {
      return res.send({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    // Update inventory quantity and inStock status based on the ordered quantity
    product.inventory.quantity -= orderData.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    // Save the updated product to the database
    await product.save();

    const result = await OrderServices.createOrderService(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      order: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: getErrorMessage(error),
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query as { email?: string };
    const result = await OrderServices.getAllOrderService(email);
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      orders: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: getErrorMessage(error),
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
