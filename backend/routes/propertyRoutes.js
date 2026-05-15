const router = require("express").Router();
const Property = require("../models/Property");
const upload = require("../utils/upload");

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ADD PROPERTY WITH IMAGE
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const coordinates = req.body['coordinates[lat]'] && req.body['coordinates[lng]']
      ? {
          lat: parseFloat(req.body['coordinates[lat]']),
          lng: parseFloat(req.body['coordinates[lng]'])
        }
      : undefined;

    // Parse facilities string to array
    const facilities = req.body.facilities 
      ? (typeof req.body.facilities === 'string' 
          ? req.body.facilities.split(',').filter(f => f.trim())
          : req.body.facilities)
      : [];

    const propertyData = {
      title: req.body.title,
      location: req.body.location,
      landmarks: req.body.landmarks,
      type: req.body.type,
      price: req.body.price,
      electricity: req.body.electricity,
      foodCost: req.body.foodCost,
      seater: req.body.seater,
      description: req.body.description,
      coordinates,
      facilities,
      images: imageUrls,
      ownerId: "tempOwner123",
      verified: true
    };

    const property = await Property.create(propertyData);
    res.status(201).json(property);
  } catch (error) {
    console.error("Property creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET ALL
router.get("/list", async (req, res) => {
  const data = await Property.find();
  res.json(data);
});

// GET DETAILS
router.get("/details/:id", async (req, res) => {
  const data = await Property.findById(req.params.id);
  res.json(data);
});

// SEARCH FILTER
router.get("/search", async (req, res) => {

  const { minPrice, maxPrice, category, gender, lat, lng } = req.query;

  let query = {};

  // 🔹 FILTERS
  if (minPrice && maxPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  }

  if (category) query.category = category;
  if (gender) query.genderPreference = gender;

  let properties = await Property.find(query);

  // 🔥 ADD DISTANCE LOGIC
  if (lat && lng) {
    properties = properties.map(p => {

      if (!p.coordinates) return null;

      const distance = getDistance(
        parseFloat(lat),
        parseFloat(lng),
        p.coordinates.lat,
        p.coordinates.lng
      );

      return {
        ...p._doc,
        distance: distance.toFixed(1)
      };
    }).filter(Boolean);
  }

  res.json(properties);
});

router.get("/owner/:ownerId", async (req, res) => {
  const data = await Property.find({
    ownerId: req.params.ownerId
  });

  res.json(data);
});

module.exports = router;