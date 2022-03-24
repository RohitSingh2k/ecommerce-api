const upload = require("../middlewares/fileUpload");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post(
  "/",
  verifyTokenAndAdmin, 
  upload.single("photo"),
  async (req, res) => {
    res.status(200).json({
      message: "file uploadded successfuly.",
      success: true,
      url: req.file.fileUrl,
    });
  }
);

module.exports = router;
