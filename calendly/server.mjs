// server.js

// BASE SETUP
// =============================================================================

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import fs from 'fs-extra'
import path from 'path';
import userRouter from './app/routes/userRoute';


const app = express();  
mongoose.connect('mongodb://root:example@localhost:27017/calendly?authSource=admin', { useNewUrlParser: true });              


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
  }));
  
// log all requests to access.log
fs.ensureFileSync('access.log');
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(path.resolve(), 'access.log'), { flags: 'a' })
}));

var port = process.env.PORT || 8080;        // set our port



// ROUTES FOR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here


// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/api/user', userRouter);

// START SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);




