

const Project = require("../models/Project");
const Feature = require("../models/Feature");
const User = require("../models/User");

const {
  createMasterAccountTransaction,
  updateMasterAccountTransaction,
  deleteMasterAccountTransaction,
} = require("../services/AccountsService");

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
  CustomApiError,
} = require("../errors");
const checkPermissions = require("../utils/checkPermissions");
const { formatToLocaleCurrency } = require("../utils/currencyFormat");
const { formatDate } = require("../utils/dateFormatter");

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
  const { amount, status, transaction_type, account_holder, projectId } =
    req.body;
  if (!amount || !status || !transaction_type || !account_holder || !projectId)
    throw new BadRequestError("Please provide all values");
  req.body.createdBy = req.user.userId;
  req.body.project = projectId;
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

const getTotalFunding = async (req, res) => {
  const { projectId } = req.query;
  if (!projectId) throw new BadRequestError("Please provide the projectId");
  const transactions = await CreditTransaction.find({ project: projectId });
  if (!transactions)
    throw new BadRequestError("No funding found for this project");
  let funding = 0;

  if (transactions) {
    for (let transaction of transactions) {
      funding += parseInt(transaction.amount);
    }
  }

  funding = formatToLocaleCurrency(funding);

  res.status(StatusCodes.OK).json({ funding });
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
  const { amount, description, status, featureId } = req.body;
  if (!amount || !description || !status || !featureId)
    throw new BadRequestError("Please provide all values");
  req.body.createdBy = req.user.userId;
  req.body.feature = featureId;
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

const getTotalExpenditure = async (req, res) => {
  const { projectId } = req.query;
  if (!projectId) throw new BadRequestError("Please provide the projectId");
  const features = await Feature.find({ project: projectId });
  if (!features)
    throw new BadRequestError("No expenditure found for this project");
  let expenditure = 0;

  for (let feature of features) {
    const transactions = await DebitTransaction.find({ feature: feature });

    if (transactions) {
      for (let transaction of transactions) {
        expenditure += parseInt(transaction.amount);
      }
    }
  }

  expenditure = formatToLocaleCurrency(expenditure);

  res.status(StatusCodes.OK).json({ expenditure });
};

const getProjectOperatingCosts = async (req, res) => {
  const { projectId } = req.query;
  if (!projectId) throw new BadRequestError("Please provide the projectId");
  let funding = 0;
  let expenditure = 0;
  let operatingBalance = 0;
  let transactionHistory = {};

  //expenditure
  const features = await Feature.find({ project: projectId });
  if (features) {
    for (let feature of features) {
      const transactions = await DebitTransaction.find({
        feature: feature,
      }).populate(["createdBy", "feature"]);

      transactionHistory["expenditure"] = transactions.map((transaction) => {
        transactionObject = transaction.toObject();
        const formattedAmount = formatToLocaleCurrency(
          parseInt(transactionObject.amount)/100
        );
        transactionObject["transaction_action"] = "dr";
        transactionObject["createdBy"] = transactionObject["createdBy"].name;
        transactionObject["transactionDate"] = formatDate(
          transactionObject["createdAt"]
        );
        transactionObject["feature"] = transactionObject["feature"].featureName;
       transactionObject["amount"] = formattedAmount;
        return transactionObject;
      });

      if (transactions) {
        for (let transaction of transactions) {
          if (!transaction.deleted) {
            expenditure += parseInt(transaction.amount);
          }
        }
      }
    }
  }

  //funding
  const transactions = await CreditTransaction.find({
    project: projectId,
  }).populate(["createdBy", "project", "account_holder"]);

  transactionHistory["funding"] = transactions;

   transactionHistory["funding"] = transactions.map((transaction) => {
     transactionObject = transaction.toObject();
     const formattedAmount = formatToLocaleCurrency(
       parseInt(transactionObject.amount)/100
     );
transactionObject["transaction_action"] = "cr";
     transactionObject["createdBy"] = transactionObject["createdBy"].name;
     transactionObject["account_holder"] =
       transactionObject["account_holder"].name;
     transactionObject["transactionDate"] = formatDate(
       transactionObject["createdAt"]
     );
     transactionObject["project"] = transactionObject["project"].name;
     transactionObject["description"] =
       transactionObject["project"]["description"];
    transactionObject["amount"] = formattedAmount;
     return transactionObject;
   });


  if (transactions) {
    for (let transaction of transactions) {
      if (!transaction.deleted) {
        funding += parseInt(transaction.amount);
      }
    }
  }
  //operating balance
  operatingBalance = funding - expenditure;

  const transactionArr = [
    ...transactionHistory["expenditure"],
    ...transactionHistory["funding"],
  ];
  const positiveBalance = operatingBalance > 0;

  transactionArr.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  }),
   
  funding = formatToLocaleCurrency(funding);
  expenditure = formatToLocaleCurrency(expenditure);
  operatingBalance = formatToLocaleCurrency(operatingBalance);

  res
    .status(StatusCodes.OK)
    .json({
      operatingBalance,
      funding,
      expenditure,
      positiveBalance,
      transactionHistory,
      transactionArr});
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
  getTotalExpenditure,
  getTotalFunding,
  getProjectOperatingCosts,
};
