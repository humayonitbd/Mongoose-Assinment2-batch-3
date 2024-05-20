import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import ProductValidationSchema from './product.validationSchema';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { data: productData } = req.body;

    const zodParseData = ProductValidationSchema.parse(productData);

    const result = await ProductServices.createProductService(zodParseData);

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


const getAllProduct=async (req:Request,res:Response)=>{
  try {

    const result = await ProductServices.getAllProductService();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
    
  }

}


const getSingleProduct=async (req:Request,res:Response)=>{
  try {

    const { productId } = req.params;
    console.log('productId', productId);

    const result = await ProductServices.getSingleProductService(productId);

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    });
    
  }

}


export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
};
