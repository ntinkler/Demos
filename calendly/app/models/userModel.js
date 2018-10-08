import mongoose from 'mongoose';
const schema = mongoose.Schema;

const userSchema = new schema({
    createHookId: { type: String, required: true },
    cancelHookId: { type: String, required: true },
    token: {type: String, required: true}
})

userSchema.methods.createHooks = function(hookService) {
    hookService.checkHooks(this.token)

    .then((res) => {
        console.log(res);
        return hookService.createHooks(this.token);
    })

    .then((res) => {
        console.log(res);
    });
}

export default mongoose.model('user', userSchema)