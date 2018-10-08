import mongoose from 'mongoose';
const schema = mongoose.Schema;

const userSchema = new schema({
    createHookId: { type: String, required: true },
    cancelHookId: { type: String, required: true },
    token: {type: String, required: true}
})

userSchema.methods.createHooks = async function(hookService) {
    var hooks = await hookService.createHooks(this.token);
    this.createHookId = hooks.createdHook.hookId;
    this.cancelHookId = hooks.canceledHook.hookId;
}

export default mongoose.model('user', userSchema)