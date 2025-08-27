const express = require("express");
const { protect } = require("../middlewares/authMiddleware.js");
const upload = require("../middlewares/uploadMiddleware.js");

const {
    registerUser, 
    loginUser, 
    getUserInfo,
} = require("../controller/authController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);


router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Cloudinary gives the hosted URL in req.file.path
    const imageUrl = req.file.path;

    res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl
    });
});

module.exports = router;
