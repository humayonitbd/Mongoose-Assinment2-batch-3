import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProduct);
router.get('/:productId', ProductControllers.getSingleProduct);
router.put('/:productId', ProductControllers.updatedProduct);
router.delete('/:productId', ProductControllers.deletedProduct);

export const ProductRoute = router;
