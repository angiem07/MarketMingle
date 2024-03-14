const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://angelam2326:WkG3J0aoKF1Vnhc0@marketmingle.sldbah1.mongodb.net/market');

module.exports = mongoose.connection;
