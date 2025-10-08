
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongo.js';
import supplierRoutes from './routes/supplier.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/suppliers', supplierRoutes);
app.use('/products', productRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Catalog service running at http://localhost:${port}`);
  });
};

startServer();

