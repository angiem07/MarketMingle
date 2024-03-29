const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Create the category class
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
