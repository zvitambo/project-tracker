const { UnauthenticatedError } = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') return true;
    if (requestUser.userId === resourceUserId.toString()) return true;
    throw new UnauthenticatedError("Not authorized to access this route");
}

module.exports = checkPermissions;