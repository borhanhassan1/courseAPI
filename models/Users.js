const mongoose = require("mongoose");
var validator = require("validator");
const userSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: [true, "This Email used before"],
    validate: [validator.isEmail, "This field should be email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "password must be at least 3 characters long"],
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

module.exports = mongoose.model("users", userSchema);
