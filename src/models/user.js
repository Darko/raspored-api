import mongoose from 'mongoose';
import constants from '../constants';

const UserConstants = constants.user;
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  avatar: { type: String },
  role: { type: String, enum: UserConstants.roles, default: 'user' },
  banned: { type: Boolean, default: false },
  suspended: { type: Boolean, default: false },
  providers: [],
  lastLogin: { type: Date } 
}, { versionKey: false });

export default mongoose.model('User', UserSchema);