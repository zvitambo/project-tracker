const express = require("express");
const {
  saveImage,
  createImage,
  getImageUrls,
  deleteImage
} = require("../controllers/imagesController");
const router = express.Router();

//images
router.route("/").get(getImageUrls).post(createImage);
router.route("/save").post(saveImage);
router.route("/:id").delete(deleteImage);




module.exports = router;