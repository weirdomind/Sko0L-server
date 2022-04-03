import { Schema, model, ObjectId } from "mongoose";

export interface StudentInterface {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  about?: string;
  avatar: string;
  phone?: string;
  grade: string;
  subjects: string[];
  createdAt: Date;
}

const StudentSchema = new Schema<StudentInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  grade: {
    type: String,
    required: true,
  },
  subjects: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<StudentInterface>("Student", StudentSchema);
