import mongoose from 'mongoose';
import app from '../app/app';
import constants from '../app/constants';

mongoose.Promise = Promise;


// TODO: This file is fairly expensive right now.  It limits tests to sequential runs,
// and test startup/teardown takes about 100ms per test.  Not the end of the world for a
// small project, but needs consideration.

global.server = null;


beforeEach(async () => {
    if(mongoose.connection.readyState !== 0) {
        console.log('mongoose in invalid state!', mongoose.connection.readyState);
        return;
    }
    await mongoose.connect('mongodb://root:example@localhost:27017/calendly_test?authSource=admin', { reconnectTries: 1, useNewUrlParser: true });
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {      
         await collection.deleteOne(); 
    }

    return new Promise(function(resolve, reject) {
        global.server = app.listen(constants.Test.Port, resolve)
    });
});

afterEach(async() => {
    await mongoose.connection.close();
    
    return new Promise(function(resolve, reject) {
        global.server.close(resolve);
    })

});
