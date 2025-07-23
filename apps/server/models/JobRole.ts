import mongoose, { Document, Schema } from 'mongoose';

export interface IJobRole extends Document {
  jobTitle: string;
  department: string;
  level: string;
  description: string;
  createdAt: Date;
}

const JobRoleSchema: Schema = new Schema<IJobRole>({
  jobTitle: { type: String, required: true },
  department: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IJobRole>('JobRole', JobRoleSchema); 