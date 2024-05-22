import { ObjectId } from 'mongodb';
import { TProduct } from './product.interface';
import Product from './product.model';

const createProductService = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductService = async (searchTerm?: string) => {
  let result;
  if (searchTerm) {
    result = await Product.find({
      name: { $regex: searchTerm, $options: 'i' },
    });
  } else {
    result = await Product.find({});
  }
  return result;
};

const getSingleProductService = async (id: string) => {
  const result = await Product.findOne({ _id: new ObjectId(id) });
  return result;
};

const updateProductService = async (id: string, newData: TProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, newData, {
    new: true,
    runValidators: true,
  });

  return updatedProduct;
};

const deleteProductService = async (id: string) => {
  const result = await Product.deleteOne({ _id: new ObjectId(id) });
  return result;
};
export const ProductServices = {
  createProductService,
  getAllProductService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
};
