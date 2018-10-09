import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoute';
import eventRouter from './routes/eventRoute';
import mongoose from 'mongoose';

mongoose.Promise = Promise;

const app = express();  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

// test route to ensure server is up
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to the api!' });   
});

// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);

export default app;




