
const MasterAccount = require("../models/MasterAccount");


const {
  BadRequestError,
  NotFoundError,
} = require("../errors");
const checkPermissions = require("../utils/checkPermissions");


const createMasterAccountTransaction = async (
  amount,
  transaction_id,
  transaction,
  transactionModel,
  user
) => {
  if (!amount || !transaction || !transaction_id || !transactionModel || !user)
    throw new BadRequestError("Please provide all values");
  const transaction_details = {
    amount,
    transaction,
    transaction_id,
    transactionModel,
    createdBy: user.userId,
  };
  const account_transaction = await MasterAccount.create(transaction_details);

  if (account_transaction) return true;
  return false;
};

const updateMasterAccountTransaction = async (
  amount,
  transaction_id,
  transaction,
  transactionModel,
  user
) => {
  if (!amount || !transaction || !transaction_id || !transactionModel || !user)
    throw new BadRequestError("Please provide all values");
  const transaction_details = {
    amount,
    transaction,
    transaction_id,
    transactionModel,
    createdBy: user.userId,
  };
  const master_account_transaction = await MasterAccount.findOne({
    transaction_id: transaction_id,
    transaction: transaction,
  });

  if (!master_account_transaction)
    throw new NotFoundError(
      `No credit transaction with id ${transaction_id} found`
    );
  checkPermissions(user, master_account_transaction.createdBy);
  const updatedTransaction = await MasterAccount.findOneAndUpdate(
    { _id: master_account_transaction._id },
    transaction_details,
    {
      new: true,
      runValidators: true,
    }
  );
  if (updatedTransaction) return true;
  return false;
};

const deleteMasterAccountTransaction = async (
  transaction_id,
  transaction,
  user
) => {
  const master_account_transaction = await MasterAccount.findOne({
    transaction_id: transaction_id,
    transaction: transaction,
  });
  if (!master_account_transaction)
    throw new NotFoundError(`No transaction with id ${transaction_id} found`);
  checkPermissions(user, master_account_transaction.createdBy);
  master_account_transaction.deleted = true;
  const result = await master_account_transaction.save();
  if (result) return true;
  return false;
};



module.exports = {
  createMasterAccountTransaction,
  updateMasterAccountTransaction,
  deleteMasterAccountTransaction,
};
