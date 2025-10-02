
import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  cnpj?: string;
  email?: string;
  phone?: string;
}

const supplierSchema = new Schema<ISupplier>(
  {
    name: { type: String, required: true, trim: true },
    cnpj: { type: String, required: false, unique: true, sparse: true },
    email: { type: String, required: false, unique: true, sparse: true },
    phone: { type: String, required: false },
  },
  { timestamps: true }
);

const Supplier = model<ISupplier>('Supplier', supplierSchema);

export default Supplier;
