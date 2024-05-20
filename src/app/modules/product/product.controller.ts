import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { data: productData } = req.body;

    const result = await ProductServices.createProductService(productData);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully!',
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

export const ProductControllers = {
  createProduct,
};