const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name }, 
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const safeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  location: user.location || null,
  role: user.role || ["user"]
});

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ user: safeUser(user) });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Unable to register user." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = createToken(user);
    return res.json({ token, user: safeUser(user) });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Unable to login." });
  }
};