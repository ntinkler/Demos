import user from '../app/models/userModel';
import random from '../app/services/randomService';
import constants from '../app/constants';

test('Users require a calendly token', async () => {
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
    var fakeUser = {
        token: constants.Test.AuthToken,
        createHookId: `${random.Int()}`,
        cancelHookId: `${random.Int()}`
    };

    let testUser = new user(fakeUser);
    await testUser.save();

    var loadedUser = await user.findOne({token: fakeUser.token});

    expect(loadedUser.token).toBe(fakeUser.token);
    expect(loadedUser.createHookId).toBe(fakeUser.createHookId);
    expect(loadedUser.cancelHookId).toBe(fakeUser.cancelHookId);
}); 
