
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://angelam2326:WkG3J0aoKF1Vnhc0@marketmingle.sldbah1.mongodb.net/?retryWrites=true&w=majority&appName=MarketMingle');


module.exports = mongoose.connection;

