const mongoose = require("mongoose");
const { TRANSACTION_MODEL, TRANSACTION } = require("../utils/enum");

const MasterAccountSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
    },
    transaction: {
      type: String,
      enum: [TRANSACTION.CREDIT, TRANSACTION.DEBIT],
      default: TRANSACTION.DEBIT,
    },
    transaction_id: {
      type: mongoose.Types.ObjectId,
      refPath: "transactionModel",
      required: [true, "Please provide the transaction id"],
    },
    transactionModel: {
      type: String,
      enum: [
        TRANSACTION_MODEL.DEBIT_TRANSACTION,
        TRANSACTION_MODEL.CREDIT_TRANSACTION,
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
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("MasterAccount", MasterAccountSchema);
