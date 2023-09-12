const mongoose = require("mongoose");
const { TRANSACTION_STATUS } = require("../utils/enum");
const crypto = require("crypto");

const DebitTransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
    },
    status: {
      type: String,
      enum: [
        TRANSACTION_STATUS.COMPLETE,
        TRANSACTION_STATUS.IN_COMPLETE,
        TRANSACTION_STATUS.REVERSED,
      ],
      default: TRANSACTION_STATUS.IN_COMPLETE,
    },
    description: {
      type: String,
      minlength:3,
      required: [true, "Please provide a project description"],
    },
    feature: {
      type: mongoose.Types.ObjectId,
      ref: "Feature",
      required: [
        true,
        "Please provide the feature related to this transaction",
      ],
    },
    deleted: {
      type: Boolean,
      default: false,
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
  { timestamps: true, toJSON: { getters: true } }
);

DebitTransactionSchema.pre("save", async function () {
  this.uuid = crypto.randomUUID();
});

module.exports = mongoose.model("DebitTransaction", DebitTransactionSchema);
