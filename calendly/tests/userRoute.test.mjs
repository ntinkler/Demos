import constants from '../app/constants';
import fetch from 'node-fetch';
import random from '../app/services/randomService';
import user from '../app/models/userModel';

test('GET /api/user/:userId should return 4XX if no user exists', async () => {
    let res = await fetch(`${constants.Test.TestUri}/api/user/${constants.Test.AuthToken}`);
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
    let body = await res.json();
    expect(body).toEqual({error: `User ${constants.Test.AuthToken} does not exist`});
});

test('GET /api/user/:userId should return that user if it exists', async () => {
    var fakeUser = {
        token: constants.Test.AuthToken,
        createHookId: `${random.Int()}`,
        cancelHookId: `${random.Int()}`
    };
    let testUser = new user(fakeUser);
    await testUser.save();
    let res = await fetch(`${constants.Test.TestUri}/api/user/${constants.Test.AuthToken}`);
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    let body = await res.json();
    expect(body).toEqual(expect.objectContaining(fakeUser));
});

test('GET /api/user/ should return an empty array if no users exist', async () => {
    let res = await fetch(`${constants.Test.TestUri}/api/user/`);
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    let body = await res.json();
    expect(body).toEqual({users: []});
});

test('GET /api/user/ should return a user if one exists', async () => {
    var fakeUser = {
        token: constants.Test.AuthToken,
        createHookId: `${random.Int()}`,
        cancelHookId: `${random.Int()}`
    };
    let testUser = new user(fakeUser);
    await testUser.save();
    let res = await fetch(`${constants.Test.TestUri}/api/user/`)
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    let body = await res.json();
    expect(body.users).toEqual(          
        expect.arrayContaining([expect.objectContaining(fakeUser)])
    );
});

test('GET /api/user/ should return all users', async () => {
    let fakeUser1 = {
        token: constants.Test.AuthToken,
        createHookId: `${random.Int()}`,
        cancelHookId: `${random.Int()}`
    };

    let fakeUser2 = {
        token: constants.Test.AuthToken,
        createHookId: `${random.Int()}`,
        cancelHookId: `${random.Int()}`
    };

    let fakeUser3 = {
        token: constants.Test.AuthToken,
        createHookId: `${random.Int()}`,
        cancelHookId: `${random.Int()}`
    };
    await (new user(fakeUser1)).save();
    await (new user(fakeUser2)).save();
    await (new user(fakeUser3)).save();

    let res = await fetch(`${constants.Test.TestUri}/api/user/`);

    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
    let body = await res.json();
    expect(body.users).toEqual(          
        expect.arrayContaining([
            expect.objectContaining(fakeUser1),
            expect.objectContaining(fakeUser2),
            expect.objectContaining(fakeUser3)
        ])
    );
});

test('DELETE /api/user/:userId should succeed even if that user does not exist', async () => {
    let res = await fetch(`${constants.Test.TestUri}/api/user/${constants.Test.AuthToken}`, {
        method: "DELETE"
    });

    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
});

test('DELETE /api/user/:userId should delete the user', async () => {
    let fakeUser = {
        token: constants.Test.AuthToken,
        createHookId: `${random.Int()}`,
        cancelHookId: `${random.Int()}`
    };
    await (new user(fakeUser)).save();

    let res = await fetch(`${constants.Test.TestUri}/api/user/${constants.Test.AuthToken}`, {
        method: "DELETE"
    });
    expect(res.status).toEqual(204);

    let loadedUser = await user.findOne({token: fakeUser.token});
    expect(loadedUser).toBeNull();
});

test('POST /api/user/:userId should create a user', async () => {
    let res = await fetch(`${constants.Test.TestUri}/api/user/${constants.Test.AuthToken}`, {
        method: "POST"
    });
    expect(res.status).toEqual(201);
    let body = await res.json();
    expect(body).toEqual(expect.objectContaining({
        token: constants.Test.AuthToken
    }));
    expect(body.createHookId).toBeDefined();
    expect(body.cancelHookId).toBeDefined();

    let createdUser = await user.findOne({token: constants.Test.AuthToken});
    expect(createdUser).toEqual(expect.objectContaining({token: constants.Test.AuthToken}));
});

test('POST /api/user/:userId should fail if the user already exists', async () => {
    let fakeUser = {
        token: constants.Test.AuthToken,
        createHookId: `${random.Int()}`,
        cancelHookId: `${random.Int()}`
    };
    await (new user(fakeUser)).save();

    let res = await fetch(`${constants.Test.TestUri}/api/user/${constants.Test.AuthToken}`, {
        method: "POST"
    });
    expect(res.status).toEqual(422);
    let body = await res.json();
    expect(body).toEqual({error: `User ${constants.Test.AuthToken} already exists`});

})
