import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubjectSchema = new Schema({
  name: { type: String, required: true },
  start: { type: Date, required: true },
  duration: { type: Number, required: true },

}, { versionKey: false });

export default mongoose.model('Subject', SubjectSchema);


/**
 * Data Structures and Algorithms
 * 
 * Start: 08:30
 * Duration: 120 // Minutes
 * Day: Wednesday
 * 
 * Professor, Assistant
 */