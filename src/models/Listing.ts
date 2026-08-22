import mongoose, { Schema, Document } from 'mongoose';

export interface IListing extends Document {
  title: string;
  description?: string;
  price?: number;
  user?: mongoose.Types.ObjectId;
}

const listingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Listing = mongoose.model<IListing>('Listing', listingSchema);
export default Listing;