const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  FEATURE_CATEGORY,
  FEATURE_STATUS,
} = require("../utils/enum");

const FeatureSchema = new mongoose.Schema(
  {
    featureName: {
      type: String,
      required: [true, "Please provide feature name"],
      minlength: 3,
      trim: true,
    },
    featureDescription: {
      type: String,
      minlength: 3,
      required: [true, "Please provide a feature description"],
    },
    featureCategory: {
      type: String,
      enum: [
        FEATURE_CATEGORY.NEW_FEATURE,
        FEATURE_CATEGORY.REPAIRS,
        FEATURE_CATEGORY.TODO,
      ],
      default: FEATURE_CATEGORY.NEW_FEATURE,
    },
    featureStatus: {
      type: String,
      enum: [
        FEATURE_STATUS.IN_PROGRESS,
        FEATURE_STATUS.FINISHED,
        FEATURE_STATUS.ON_HOLD,
      ],
      default: FEATURE_STATUS.IN_PROGRESS,
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: [true, "Please provide project"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    uuid: {
      type: String,
    },
  },
  { timestamps: true }
);

FeatureSchema.pre("save", async function () {
  this.uuid = crypto.randomUUID();
});


module.exports = mongoose.model("Feature", FeatureSchema);
