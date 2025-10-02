
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/mongo.js';
import supplierRoutes from './routes/supplier.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Catalog service running at http://localhost:${port}`);
  });
};

startServer();

