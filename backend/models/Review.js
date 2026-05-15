const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: String,
  propertyId: String,

  ratings: {
    room: Number,
    food: Number,
    wifi: Number,
    cleanliness: Number,
    safety: Number,
    value: Number
  },

  comment: String,

  verified: Boolean
});

module.exports = mongoose.model("Review", reviewSchema);