import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
}, { versionKey: false });

export default mongoose.model('Subscription', SubscriptionSchema);