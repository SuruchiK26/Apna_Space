const router = require("express").Router();
const Review = require("../models/Review");
const Booking = require("../models/Booking");
const Property = require("../models/Property");

// ADD REVIEW (ONLY IF VISITED)
router.post("/add", async (req, res) => {

  const booking = await Booking.findOne({
    userId: "tempUser123",
    propertyId: req.body.propertyId,
    status: "visited"
  });

  if (!booking) {
    return res.status(403).send("Only visited users can review");
  }

  const review = await Review.create({
    ...req.body,
    userId: "tempUser123",
    verified: true
  });

  // UPDATE RATING
  const reviews = await Review.find({ propertyId: req.body.propertyId });

  let total = 0;

  reviews.forEach(r => {
    const avg = Object.values(r.ratings).reduce((a,b)=>a+b)/6;
    total += avg;
  });

  const avgRating = total / reviews.length;

  await Property.findByIdAndUpdate(req.body.propertyId, {
    avgRating,
    totalReviews: reviews.length
  });

  res.json(review);
});

module.exports = router;