const express = require("express");
const {
  getMasterAccount,
  createCreditTransaction,
  createDebitTransaction,
  updateCreditTransaction,
  updateDebitTransaction,
  getAllCreditTransactions,
  getAllDebitTransactions,
  deleteCreditTransaction,
  deleteDebitTransaction
} = require("../controllers/accountsController");
const router = express.Router();

//master
router
  .route("/")
  .get(getMasterAccount);


//credit
router
  .route("/credit")
  .get(getAllCreditTransactions)
router.route("/credit/:project_id").post(createCreditTransaction);
router
  .route("/credit/:id")
  .delete(deleteCreditTransaction)
  .patch(updateCreditTransaction);

//debit
router.route("/debit").get(getAllDebitTransactions);
router.route("/debit/:feature_id").post(createDebitTransaction);
router
  .route("/debit/:id")
  .delete(deleteDebitTransaction)
  .patch(updateDebitTransaction);

module.exports = router;
