import { ObjectId } from 'mongodb';
import { TProduct } from './product.interface';
import Product from './product.model';

const createProductService = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductService = async () => {
  const result = await Product.find({});
  return result;
};

const getSingleProductService = async (id: string) => {
  const result = await Product.find({ _id: new ObjectId(id) });
  return result;
};

const updateProductService = async (data:TProduct) => {
  const result = await Product.find({ $set:{} });
  return result;
};

export const ProductServices = {
  createProductService,
  getAllProductService,
  getSingleProductService,
  updateProductService,
};
