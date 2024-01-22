const moment = require("moment");
const {
  CustomApiError,
} = require("../errors");

 const formatDate = (dateToFormat) => {
  if (dateToFormat.length < 1) throw new CustomApiError("Invalid date")
  let date = moment(dateToFormat);
  return date.format("MMM Do, YYYY");
 
};

module.exports = {
  formatDate,
};
