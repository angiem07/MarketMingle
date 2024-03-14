const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://bcort49:lYXyAEjOJkxfWCTy@marketmingle.3jhy40d.mongodb.net/"
);

module.exports = mongoose.connection;

//mongodb+srv://bcort49:lYXyAEjOJkxfWCTy@marketmingle.3jhy40d.mongodb.net/
//mongodb+srv://bcort49:<password>@marketmingle.3jhy40d.mongodb.net/
// lYXyAEjOJkxfWCTy;
