import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    createHookId: { type: String },
    cancelHookId: { type: String },
    token: {type: String}
})

export default mongoose.model('User', UserSchema)