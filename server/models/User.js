const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");
const Order = require("./Order");

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true }, //email address of the user
  password: {
    type: String,
    required: "Please provide a password",
    minlength: 6,
  },
  orders: [Order.schema],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

//Compare the incoming password the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
