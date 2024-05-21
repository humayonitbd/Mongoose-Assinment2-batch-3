import mongoose from 'mongoose';
import { z } from 'zod';

const OrderValidationSchema = z.object({
  email: z.string().email('Please fill a valid email address'),
  productId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID')
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: 'Invalid product ID',
    })
    .transform((id) => new mongoose.Types.ObjectId(id)),
  price: z.number().min(0, 'Price must be a non-negative number'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export default OrderValidationSchema;
