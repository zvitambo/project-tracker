const mongoose = require("mongoose");
const {
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
} = require("../utils/enum");

const CreditTransactionSchema = new mongoose.Schema(
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
    transaction_type: {
      type: String,
      enum: [TRANSACTION_TYPE.CONTRIBUTION, TRANSACTION_TYPE.INVESTMENT],
      default: TRANSACTION_TYPE.INVESTMENT,
    },
    account_holder: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide investor or contributor"],
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: [true, "Please provide project"],
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
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("CreditTransaction", CreditTransactionSchema);
