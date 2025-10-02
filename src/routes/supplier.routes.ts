
import { Router } from 'express';
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplierById,
  deleteSupplierById,
} from '../controllers/supplier.controller.js';

const router: Router = Router();

router.post('/', createSupplier);
router.get('/', getAllSuppliers);
router.get('/:id', getSupplierById);
router.put('/:id', updateSupplierById);
router.delete('/:id', deleteSupplierById);

export default router;
