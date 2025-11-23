import mongoose, { Schema, Document } from 'mongoose';

export interface IVisit extends Document {
  ipHash: string;
  deviceType: string;
  pagePath: string;
  timestamp: Date;
}

const VisitSchema: Schema = new Schema({
  ipHash: { type: String, required: true },
  deviceType: { type: String, required: true },
  pagePath: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Visit || mongoose.model<IVisit>('Visit', VisitSchema);
