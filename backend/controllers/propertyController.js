const Property = require("../models/Property");

exports.addProperty = async (req, res) => {
  try {
    const imageUrls = req.files.map(file => file.path);

    const coordinates = req.body['coordinates[lat]'] && req.body['coordinates[lng]']
      ? {
          lat: parseFloat(req.body['coordinates[lat]']),
          lng: parseFloat(req.body['coordinates[lng]'])
        }
      : undefined;

    const newProperty = new Property({
      ...req.body,
      coordinates,
      images: imageUrls
    });

    await newProperty.save();

    res.status(201).json({ message: "Property added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};