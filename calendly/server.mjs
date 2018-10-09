// server.js

// BASE SETUP
// =============================================================================

import app from './app/app';
import mongoose from 'mongoose';

let mongohost = process.env.mongohost || 'localhost';
console.log(mongohost);

mongoose.connect(`mongodb://root:example@${mongohost}:27017/calendly?authSource=admin`, { useNewUrlParser: true });

let port = process.env.PORT || 8080;

app.listen(port);
console.log('Lisenting on port ' + port);





