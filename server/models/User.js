const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'dealer'], // Role can be customer or dealer
    default: 'customer', // Default role is customer
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
