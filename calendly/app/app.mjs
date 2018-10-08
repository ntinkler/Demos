import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs-extra'
import path from 'path';
import userRouter from './routes/userRoute';

const app = express();  

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

var router = express.Router();
// test route to make sure server is running
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);
app.use('/api/user', userRouter);

export default app;

