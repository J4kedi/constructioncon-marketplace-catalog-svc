
import type { Request, Response } from 'express';
import Product from '../models/product.model.js';
import Supplier from '../models/supplier.model.js';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { supplier: supplierId } = req.body;
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, supplier, minPrice, maxPrice } = req.query;

    const filters: any = {};

    if (category) {
      filters.category = { $regex: category, $options: 'i' };
    }

    if (supplier) {
      filters.supplier = supplier;
    }

    if (minPrice || maxPrice) {
      filters.unitPrice = {};
      if (minPrice) {
        filters.unitPrice.$gte = parseFloat(minPrice as string);
      }
      if (maxPrice) {
        filters.unitPrice.$lte = parseFloat(maxPrice as string);
      }
    }

    const products = await Product.find(filters).populate('supplier', 'name');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
