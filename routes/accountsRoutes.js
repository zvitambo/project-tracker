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
  deleteDebitTransaction,
  getTotalExpenditure,
  getTotalFunding,
  getProjectOperatingCosts,
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
router.route("/credit/funding").get(getTotalFunding);
router.route("/credit/").post(createCreditTransaction);
router
  .route("/credit/:id")
  .delete(deleteCreditTransaction)
  .patch(updateCreditTransaction);

//debit
router.route("/debit").get(getAllDebitTransactions);
router.route("/debit/expenditure").get(getTotalExpenditure);
router.route("/debit/").post(createDebitTransaction);
router
  .route("/debit/:id")
  .delete(deleteDebitTransaction)
  .patch(updateDebitTransaction);

//getProjectOperatingCosts
router.route("/project").get(getProjectOperatingCosts);

module.exports = router;
