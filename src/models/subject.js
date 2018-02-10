import mongoose from 'mongoose';
const { Schema } = mongoose;

const exam = {
  date: { type: Date },
  notes: { type: String },
  isFinal: { type: Boolean, default: false }
}

const ExamSchema = new Schema(exam, { versionKey: false });

const SubjectSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  semester: { type: Number },
  professor: { type: String },
  assistant: { type: String },
  exams: [exam]
}, { versionKey: false });

export default mongoose.model('Subject', SubjectSchema);
export const Exam = mongoose.model('Exam', ExamSchema);

/**
 * Data Structures and Algorithms
 * 
 * Start: 08:30
 * Duration: 120 // Minutes
 * Day: Wednesday
 * 
 * Professor, Assistant
 */