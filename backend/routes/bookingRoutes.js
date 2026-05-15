const router = require("express").Router();
const Booking = require("../models/Booking");

// BOOK SLOT
router.post("/book", async (req, res) => {
  const booking = await Booking.create({
    userId: "tempUser123",
    propertyId: req.body.propertyId,
    date: req.body.date,
    timeSlot: req.body.timeSlot
  });

  res.json(booking);
});

// GET BOOKINGS
router.get("/:propertyId", async (req, res) => {
  const bookings = await Booking.find({
    propertyId: req.params.propertyId
  });

  res.json(bookings);
});

// UPDATE STATUS (OWNER)
router.put("/status/:id", async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;