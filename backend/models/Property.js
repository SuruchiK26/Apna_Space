const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  ownerId: String,

  title: String,
  location: String,
  landmarks: String,
  coordinates: {
    lat: Number,
    lng: Number
  },

  type: {
    type: String,
    enum: ["PG", "Hostel", "Flat"]
  },

  price: Number,
  deposit: Number,
  electricity: Number,
  foodCost: Number,
  seater: String,

  facilities: [String],
  category: {
    type: String,
    enum: ["pg", "flat", "student", "working", "family"]
  },

  genderPreference: {
    type: String,
    enum: ["boys", "girls", "any"]
  },

  images: [String],
  video: String,
  description: String,

  verified: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now },

  availability: {
    type: String,
    enum: ["available", "occupied", "next_month"],
    default: "available"
  },

  avgRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
});

module.exports = mongoose.model("Property", propertySchema);