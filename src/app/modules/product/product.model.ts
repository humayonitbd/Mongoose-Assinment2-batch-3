import { Schema, model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

// Mongoose schemas
const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: [true, 'Variant type is required'] },
  value: { type: String, required: [true, 'Variant value is required'] },
});

const InventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: [true, 'Inventory quantity is required'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Inventory inStock status is required'],
  },
});

const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: [true, 'Product name is required'] },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  price: { type: Number, required: [true, 'Product price is required'] },
  category: { type: String, required: [true, 'Product category is required'] },
  tags: { type: [String], required: [true, 'Product tags are required'] },
  variants: {
    type: [VariantSchema],
    required: [true, 'Product variants are required'],
  },
  inventory: {
    type: InventorySchema,
    required: [true, 'Product inventory is required'],
  },
});
// Mongoose model
const Product = model<TProduct>('Product', ProductSchema);

export default Product;
