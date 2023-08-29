const Project = require("../models/Project");
const Feature = require("../models/Feature");

const {
  createMasterAccountTransaction,
  updateMasterAccountTransaction,
  deleteMasterAccountTransaction,
} = require("../services/AccountsService")

const CreditTransaction = require("../models/CreditTransaction");
const DebitTransaction = require("../models/DebitTransaction");
const MasterAccount = require("../models/MasterAccount");
const {
  TRANSACTION_STATUS,
  TRANSACTION_MODEL,
  TRANSACTION,
  TRANSACTION_TYPE,
} = require("../utils/enum");

const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");
const checkPermissions = require("../utils/checkPermissions");
const mongoose = require("mongoose");
const moment = require("moment");

const getMasterAccount = async (req, res) => {
  const { date, search, searchByTransaction, sort } = req.query;

  const queryObject = {};

  if (date && date !== "all") {
    queryObject.createdAt = { $regex: date, $options: "i" };
  }

  // if (projectCategory && projectCategory !== "all") {
  //   queryObject.projectCategory = projectCategory;
  // }

  if (search) {
    queryObject.amount = { $regex: search, $options: "i" };
  }

  if (searchByTransaction) {
    queryObject.transaction = { $regex: searchByTransaction, $options: "i" };
  }

  let result = MasterAccount.find(queryObject);

  if (sort && sort === "lastest") {
    result = result.sort("-createdAt");
  }
  if (sort && sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort && sort === "a-z") {
    result = result.sort("amount");
  }
  if (sort && sort === "z-a") {
    result = result.sort("-amount");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const transactions = await result;
  const totalTransactions = await MasterAccount.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTransactions / limit);
  res
    .status(StatusCodes.OK)
    .json({ transactions, totalTransactions, numOfPages });
};


const getAllCreditTransactions = async (req, res) => {
  const { status, search, date, sort, project_id } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (project_id && project_id !== "all") {
    queryObject.project_id = project_id;
  }
  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (date && date !== "all") {
    queryObject.createdAt = { $regex: date, $options: "i" };
  }

  if (search) {
    queryObject.amount = { $regex: search, $options: "i" };
  }
  let result = CreditTransaction.find(queryObject);

  if (sort && sort === "lastest") {
    result = result.sort("-createdAt");
  }
  if (sort && sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort && sort === "a-z") {
    result = result.sort("amount");
  }
  if (sort && sort === "z-a") {
    result = result.sort("-amount");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const transactions = await result;
  const totalTransactions = await CreditTransaction.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTransactions / limit);
  res
    .status(StatusCodes.OK)
    .json({ transactions, totalTransactions, numOfPages });
};

const createCreditTransaction = async (req, res) => {
  const { project_id } = req.params;
  const { amount, transaction_type, account_holder } = req.body;
  if (!amount || !transaction_type || !account_holder)
    throw new BadRequestError("Please provide all values");
  req.body.createdBy = req.user.userId;
  req.body.project = project_id;
  const transaction = await CreditTransaction.create(req.body);
  if (transaction) {
    transaction.status = TRANSACTION_STATUS.COMPLETE;
    transaction.save();
    const result = await createMasterAccountTransaction(
      transaction.amount,
      transaction._id,
      TRANSACTION.CREDIT,
      TRANSACTION_MODEL.CREDIT_TRANSACTION,
      req.user
    );
    if (!result) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "master account transaction failed" });
    }
  }
  res.status(StatusCodes.OK).json({ transaction });
};

const updateCreditTransaction = async (req, res) => {
  const { id: transaction_id } = req.params;
  const { amount, status, transaction_type, account_holder, project } =
    req.body;
  if (!amount || !status || !transaction_type || !account_holder || !project)
    throw new BadRequestError("Please provide all values");
  const transaction = await CreditTransaction.findOne({ _id: transaction_id });

  if (!transaction)
    throw new NotFoundError(
      `No credit transaction with id ${transaction_id} found`
    );
  checkPermissions(req.user, transaction.createdBy);
  const updatedTransaction = await CreditTransaction.findOneAndUpdate(
    { _id: transaction_id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedTransaction) {
    const result = await updateMasterAccountTransaction(
      updatedTransaction.amount,
      updatedTransaction._id,
      TRANSACTION.CREDIT,
      TRANSACTION_MODEL.CREDIT_TRANSACTION,
      req.user
    );
    if (!result) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "master account transaction update failed" });
    }
  }
  res.status(StatusCodes.OK).json({ updatedTransaction });
};

const deleteCreditTransaction = async (req, res) => {
  const { id: transaction_id } = req.params;
  const transaction = await CreditTransaction.findOne({ _id: transaction_id });
  if (!transaction)
    throw new NotFoundError(
      `No credit transaction with id ${transaction_id} found`
    );
  checkPermissions(req.user, transaction.createdBy);

  if (
    deleteMasterAccountTransaction(
      transaction._id,
      TRANSACTION.CREDIT,
      req.user
    )
  ) {
    transaction.deleted = true;
    await transaction.save();

    res
      .status(StatusCodes.OK)
      .json({ msg: "Success! credit transaction deleted" });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Failed to delete transaction" });
};

const getAllDebitTransactions = async (req, res) => {
  const { status, search, date, sort, feature_id } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (feature_id && feature_id !== "all") {
    queryObject.feature_id = feature_id;
  }

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (date && date !== "all") {
    queryObject.createdAt = { $regex: date, $options: "i" };
  }

  if (search) {
    queryObject.amount = { $regex: search, $options: "i" };
  }

  let result = DebitTransaction.find(queryObject);

  if (sort && sort === "lastest") {
    result = result.sort("-createdAt");
  }
  if (sort && sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort && sort === "a-z") {
    result = result.sort("amount");
  }
  if (sort && sort === "z-a") {
    result = result.sort("-amount");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const transactions = await result;
  const totalTransactions = await DebitTransaction.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalTransactions / limit);
  res
    .status(StatusCodes.OK)
    .json({ transactions, totalTransactions, numOfPages });
};

const createDebitTransaction = async (req, res) => {
  const { feature_id } = req.params;
  const { amount } = req.body;
  if (!amount) throw new BadRequestError("Please provide amounts");
  req.body.createdBy = req.user.userId;
  req.body.feature = feature_id;
  const transaction = await DebitTransaction.create(req.body);
  if (transaction) {
    transaction.status = TRANSACTION_STATUS.COMPLETE;
    transaction.save();
    const result = await createMasterAccountTransaction(
      transaction.amount,
      transaction._id,
      TRANSACTION.DEBIT,
      TRANSACTION_MODEL.DEBIT_TRANSACTION,
      req.user
    );
    if (!result) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "master account transaction failed" });
    }

    res.status(StatusCodes.OK).json({ transaction });
  }

  res.status(StatusCodes.OK).json({ transaction });
};

const updateDebitTransaction = async (req, res) => {
  const { id: transaction_id } = req.params;
  const { amount, status, feature } = req.body;
  if (!amount || !status || !feature)
    throw new BadRequestError("Please provide all values");
  const transaction = await DebitTransaction.findOne({ _id: transaction_id });

  if (!transaction)
    throw new NotFoundError(
      `No debit transaction with id ${transaction_id} found`
    );
  checkPermissions(req.user, transaction.createdBy);
  
  const updatedTransaction = await DebitTransaction.findOneAndUpdate(
    { _id: transaction_id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (updatedTransaction) {
    const result = await updateMasterAccountTransaction(
      updatedTransaction.amount,
      updatedTransaction._id,
      TRANSACTION.DEBIT,
      TRANSACTION_MODEL.DEBIT_TRANSACTION,
      req.user
    );
    if (!result) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "master account transaction update failed" });
    }
  }
  res.status(StatusCodes.OK).json({ updatedTransaction });
};

const deleteDebitTransaction = async (req, res) => {
  const { id: transaction_id } = req.params;
  const transaction = await DebitTransaction.findOne({ _id: transaction_id });
  if (!transaction)
    throw new NotFoundError(
      `No debit transaction with id ${transaction_id} found`
    );
  checkPermissions(req.user, transaction.createdBy);
  if (
    deleteMasterAccountTransaction(transaction._id, TRANSACTION.DEBIT, req.user)
  ) {
    transaction.deleted = true;
    await transaction.save();

    res
      .status(StatusCodes.OK)
      .json({ msg: "Success! credit transaction deleted" });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Failed to delete transaction" });
};

module.exports = {
  getMasterAccount,
  createCreditTransaction,
  createDebitTransaction,
  updateCreditTransaction,
  updateDebitTransaction,
  getAllCreditTransactions,
  getAllDebitTransactions,
  deleteCreditTransaction,
  deleteDebitTransaction,
};
