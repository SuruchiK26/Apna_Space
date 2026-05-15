const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/me", authMiddleware, userController.getProfile);
router.post("/location", authMiddleware, userController.saveLocation);

module.exports = router;
