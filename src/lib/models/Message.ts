import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  content: string;
  status: 'unread' | 'read';
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read'], default: 'unread' },
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
