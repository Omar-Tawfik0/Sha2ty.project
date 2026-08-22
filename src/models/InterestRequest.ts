import mongoose, { Schema, Document } from 'mongoose';

export interface IInterestRequest extends Document {
  listing: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
}

const interestRequestSchema = new Schema<IInterestRequest>(
  {
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const InterestRequest = mongoose.model<IInterestRequest>('InterestRequest', interestRequestSchema);
export default InterestRequest;