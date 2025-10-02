
import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  unit: string;
  unitPrice: number;
  supplier: Schema.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false },
    unit: { type: String, required: true },
    unitPrice: { type: Number, required: true, min: 0 },
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  },
  { timestamps: true }
);

productSchema.index({ supplier: 1, name: 1 }, { unique: true });

const Product = model<IProduct>('Product', productSchema);

export default Product;
