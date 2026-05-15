const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: [String],
    default: ["user"]
  },
  location: {
    lat: Number,
    lng: Number,
    name: String
  }
});

module.exports = mongoose.model("User", userSchema);