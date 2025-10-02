
import type { Request, Response } from 'express';
import Supplier from '../models/supplier.model.js';
import type { ISupplier } from '../models/supplier.model.js';

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const newSupplier: ISupplier = new Supplier(req.body);
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    res.status(500).json({ message: 'Error creating supplier', error });
  }
};

export const getAllSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suppliers', error });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching supplier', error });
  }
};

export const updateSupplierById = async (req: Request, res: Response) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: 'Error updating supplier', error });
  }
};

export const deleteSupplierById = async (req: Request, res: Response) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting supplier', error });
  }
};
