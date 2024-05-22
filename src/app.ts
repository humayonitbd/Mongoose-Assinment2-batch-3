import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoute } from './app/modules/product/product.route';
import { OrderRoute } from './app/modules/orders/order.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application route..
app.use('/api/products', ProductRoute);
app.use('/api/orders', OrderRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('server is running.');
});

export default app;

app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({ success: false, message: 'Route not found!' });
});
