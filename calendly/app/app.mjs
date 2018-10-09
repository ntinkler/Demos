import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoute';
import eventRouter from './routes/eventRoute';
import mongoose from 'mongoose';
import morgan from 'morgan';
import fs from 'fs-extra';
import path from 'path';
import cors from 'cors';

mongoose.Promise = Promise;

const app = express(); 

app.use(cors());

// log to console
app.use(morgan('dev', {
    skip: function(req, res) { return req.originalUrl === '/' }
}));
  
// log to access.log
fs.ensureFileSync('access.log');
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(path.resolve(), 'access.log'), { flags: 'a' })
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

// test route to ensure server is up
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to the api!' });   
});

// all of our routes will be prefixed with /api
app.use('/', router);  // GCE load balencers use / as the default healthcheck...
app.use('/api', router);
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);


export default app;




