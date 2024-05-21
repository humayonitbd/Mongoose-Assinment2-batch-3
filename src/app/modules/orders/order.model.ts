import mongoose, { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Product ID is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a non-negative number'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
});

const Order = model<IOrder>('Order', OrderSchema);

export default Order;
