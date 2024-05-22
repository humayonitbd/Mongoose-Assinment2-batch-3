import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import ProductValidationSchema from './product.validationSchema';
import mongoose from 'mongoose';
import getErrorMessage from '../../utils/getErrorMessage';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    const zodParseData = ProductValidationSchema.parse(productData);

    const result = await ProductServices.createProductService(zodParseData);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully!',
      product: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: getErrorMessage(error),
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query as { searchTerm?: string };

    const result = await ProductServices.getAllProductService(searchTerm);

    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product  not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      products: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: getErrorMessage(error),
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid product ID' });
    }
    const result = await ProductServices.getSingleProductService(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      product: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: getErrorMessage(error),
    });
  }
};

const updatedProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid product ID' });
    }
    const bodyData = req.body;
    const result = await ProductServices.updateProductService(
      productId,
      bodyData,
    );

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Product updated not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product is updated successfully!',
      product: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: getErrorMessage(error),
    });
  }
};

const deletedProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid product ID' });
    }
    const result = await ProductServices.deleteProductService(productId);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Products deleted  successfully!',
      product: null,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: getErrorMessage(error),
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updatedProduct,
  deletedProduct,
};
