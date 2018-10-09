// server.js

// BASE SETUP
// =============================================================================

import app from './app/app';
import mongoose from 'mongoose';
import morgan from 'morgan';
import fs from 'fs-extra'
import path from 'path';

let mongohost = process.env.mongohost || 'localhost';
console.log(mongohost);

mongoose.connect(`mongodb://root:example@${mongohost}:27017/calendly?authSource=admin`, { useNewUrlParser: true });

let port = process.env.PORT || 8080;

// log to console
app.use(morgan('tiny'));
  
// log to access.log
fs.ensureFileSync('access.log');
app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(path.resolve(), 'access.log'), { flags: 'a' })
}));

app.listen(port);
console.log('Lisenting on port ' + port);





