import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HookSchema = new Schema({
    hookId: { type: String },
    url: { type: String }
})

export default mongoose.model('Hook', HookSchema)