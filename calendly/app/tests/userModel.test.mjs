import user from '../models/userModel';

beforeAll(function(done) {
    //mongoose.connect('mongodb://root:example@localhost:27017/calendly?authSource=admin', { reconnectTries: 1, useNewUrlParser: true }, done);
});

beforeEach(function(done) {
    
});

afterEach(function() {

});

afterAll(() => {
    //mongoose.connection.close();
});

test('Users require a calendly token', () => {
    let testUser = new user();
    let result = testUser.validateSync();
    expect(result).toBeDefined();
    expect(result.errors).toBeDefined();
    expect(result.errors.token).toBeDefined();
    expect(result.errors.token.message).toEqual('Path `token` is required.');
});

test('Users require a createHook id', () => {
    let testUser = new user();
    let result = testUser.validateSync();
    expect(result).toBeDefined();
    expect(result.errors).toBeDefined();
    expect(result.errors.createHookId).toBeDefined();
    expect(result.errors.createHookId.message).toEqual('Path `createHookId` is required.');
});

test('Users require a cancelHook id', () => {
    let testUser = new user();
    let result = testUser.validateSync();
    expect(result).toBeDefined();
    expect(result.errors).toBeDefined();
    expect(result.errors.cancelHookId).toBeDefined();
    expect(result.errors.cancelHookId.message).toEqual('Path `cancelHookId` is required.');
});

test('Users can be saved and loaded', async () => {
    let testUser = new user({token: 'test', createHookId: 'create', cancelHookId: 'cancel'});
    await testUser.save();
    console.log('post save');
});
