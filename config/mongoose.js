const mongoose = require('mongoose');

// establishes a connection to a MongoDB database.
mongoose.connect('mongodb://localhost/Employee-Review-System');
mongoose.set('strictQuery', false);
const db = mongoose.connection;

db.on('error', console.error.bind('Error while connecting to the database'));

db.once('open', function() {
    console.log('Successfully connected to the database');
});

module.exports = db;