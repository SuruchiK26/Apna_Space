const User = require("../models/User");

const safeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  location: user.location || null,
  role: user.role || ["user"]
});

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    return res.json({ user: safeUser(user) });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ error: "Unable to fetch user." });
  }
};

exports.saveLocation = async (req, res) => {
  try {
    const { lat, lng, address } = req.body;

    if (lat == null || lng == null || !address) {
      return res.status(400).json({ error: "Latitude, longitude and address are required." });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { location: { lat, lng, name: address } },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found." });
    return res.json({ user: safeUser(user) });
  } catch (error) {
    console.error("Save location error:", error);
    return res.status(500).json({ error: "Unable to save location." });
  }
};