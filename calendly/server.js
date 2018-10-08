// server.js

// BASE SETUP
// =============================================================================

import mongoose from 'mongoose';
import app from './app/app';

mongoose.connect('mongodb://root:example@localhost:27017/calendly?authSource=admin', { useNewUrlParser: true });

var port = process.env.PORT || 8080;        // set our port

app.listen(port);
console.log('Lisenting on port ' + port);





