import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/', OrderControllers.createOrder);
router.get('/', OrderControllers.getAllOrder);
// router.get('/:productId', OrderControllers.getSingleProduct);
// router.put('/:productId', OrderControllers.updatedProduct);
// router.delete('/:productId', OrderControllers.deletedProduct);

export const OrderRoute = router;
