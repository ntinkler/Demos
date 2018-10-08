import mongoose from 'mongoose';
mongoose.Promise = Promise;

beforeEach(async () => {
    await mongoose.connect('mongodb://root:example@localhost:27017/calendly_test?authSource=admin', { reconnectTries: 1, useNewUrlParser: true });
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {      
         await collection.deleteOne(); 
    }
});

afterEach(async() => {
    await mongoose.connection.close();
});


