const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  propertyId: String,

  date: String,
  timeSlot: String,

  status: {
    type: String,
    enum: ["pending", "confirmed", "rejected", "visited"],
    default: "pending"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);