const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { IMAGE_STATUS } = require("../utils/enum");

const ImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide image name"],
      minlength: 3,
      trim: true,
    },
    description: {
      type: String,
      minlength: 3,
      required: [true, "Please provide a image description"],
    },
    url: {
      type: String,
      required: [true, "Please provide a image url"],
    },
    image_owner: {
      type: String,
      required: [
        true,
        "Please provide uuid of the user, project or feature that the image belongs too",
      ],
    },
    status: {
      type: String,
      enum: [
        IMAGE_STATUS.RECEIPT,
        IMAGE_STATUS.GALLERY,
        IMAGE_STATUS.JOB_IN_PROGRESS,
        IMAGE_STATUS.PRE_JOB,
        IMAGE_STATUS.POST_JOB,
      ],
      default: IMAGE_STATUS.PRE_JOB,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Image", ImageSchema);
