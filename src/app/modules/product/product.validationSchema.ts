import { z } from 'zod';

// Zod schemas
const VariantSchema = z.object({
  type: z.string().min(1, { message: 'Variant type is required' }),
  value: z.string().min(1, { message: 'Variant value is required' }),
});

const InventorySchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative({
      message: 'Inventory quantity must be a non-negative integer',
    })
    .refine((val) => val >= 0, { message: 'Inventory quantity is required' }),
  inStock: z.boolean().refine((val) => typeof val === 'boolean', {
    message: 'Inventory inStock status is required',
  }),
});

const ProductValidationSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  description: z
    .string()
    .min(1, { message: 'Product description is required' }),
  price: z
    .number()
    .positive({ message: 'Product price must be a positive number' })
    .refine((val) => val > 0, { message: 'Product price is required' }),
  category: z.string().min(1, { message: 'Product category is required' }),
  tags: z
    .array(
      z.string().min(1, { message: 'Each tag must be a non-empty string' }),
    )
    .min(1, { message: 'Product tags are required' }),
  variants: z
    .array(VariantSchema)
    .min(1, { message: 'Product variants are required' }),
  inventory: InventorySchema,
});

export default ProductValidationSchema;
