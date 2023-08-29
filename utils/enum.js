const PROJECT_CATEGORY = {
  FAMILY_HOME_RENOVATIONS: "Family Home Renovations/Revamping",
  FAMILY_FUNCTION: "Family Function",
};

const FEATURE_CATEGORY = {
  NEW_FEATURE: "New Feature",
  REPAIRS: "Repairs",
  TODO: "To do / task",
};


const PROJECT_STATUS = {
  IN_PROGRESS: "In Progress",
  FINISHED: "Finished",
  ON_HOLD: "On Hold",
};

const FEATURE_STATUS = {
  IN_PROGRESS: "In Progress",
  FINISHED: "Finished",
  ON_HOLD: "On Hold",
};

const IMAGE_STATUS = {
  PRE_JOB: "Before the Job",
  JOB_IN_PROGRESS: "During the job/work",
  POST_JOB: "After the Job",
  GALLERY: "Personal Gallery Picture"
};


const TRANSACTION_TYPE= {
  INVESTMENT: "Investment",
  CONTRIBUTION: "Contribution",
  DEBIT: "Debit",
  CREDIT: "Credit"
};

const TRANSACTION_STATUS = {
  IN_COMPLETE: "Incomplete",
  COMPLETE: "Complete",
  REVERSED: "Reversed",
};

const TRANSACTION = {
  DEBIT: "debit",
  CREDIT: "credit",
};


const TRANSACTION_MODEL = {
  DEBIT_TRANSACTION: "DebitTransaction",
  CREDIT_TRANSACTION: "CreditTransaction"
};



module.exports = {
  PROJECT_CATEGORY,
  FEATURE_CATEGORY,
  PROJECT_STATUS,
  FEATURE_STATUS,
  IMAGE_STATUS,
  TRANSACTION_TYPE,
  TRANSACTION_STATUS,
  TRANSACTION_MODEL,
  TRANSACTION,
};
