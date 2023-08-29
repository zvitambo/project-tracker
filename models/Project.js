const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  PROJECT_CATEGORY,
  PROJECT_STATUS,
} = require("../utils/enum");


const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide project name"],
      minlength: 8,
      trim: true,
    },
    description: {
      type: String,
      minlength: 12,
      required: [true, "Please provide a project description"],
    },
    category: {
      type: String,
      enum: [
        PROJECT_CATEGORY.FAMILY_FUNCTION,
        PROJECT_CATEGORY.FAMILY_HOME_RENOVATIONS,
      ],
      default: PROJECT_CATEGORY.FAMILY_HOME_RENOVATIONS,
    },
    status: {
      type: String,
      enum: [
        PROJECT_STATUS.IN_PROGRESS,
        PROJECT_STATUS.FINISHED,
        PROJECT_STATUS.ON_HOLD,
      ],
      default: PROJECT_STATUS.IN_PROGRESS,
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

ProjectSchema.pre("save", async function () {
  this.uuid = crypto.randomUUID();
});

module.exports = mongoose.model("Project", ProjectSchema);
