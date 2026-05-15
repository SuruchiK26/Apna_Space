const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());
const path = require("path");

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/review", reviewRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));