const mongoose = require('mongoose');

function connectToMongoDb(uri) {
    mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });
}

module.exports = {
    connectToMongoDb,
}