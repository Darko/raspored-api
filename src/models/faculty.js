import mongoose from 'mongoose';
const { Schema } = mongoose;

const FacultySchema = new Schema({
  name: { type: String }
}, { versionKey: false });

export default mongoose.model('Faculty', FacultySchema);