// server.js

// BASE SETUP
// =============================================================================

import app from './app/app';
import mongoose from 'mongoose';

mongoose.connect('mongodb://root:example@localhost:27017/calendly?authSource=admin', { useNewUrlParser: true });

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Lisenting on port ' + port);





