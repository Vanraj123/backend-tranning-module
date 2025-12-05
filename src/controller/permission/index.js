const createSuccessResponse =
  require("eva-utilities").utilities.createSuccessResponse;
const createErrorResponse =
  require("eva-utilities").utilities.createErrorResponse;
const { UnAuthenticatedError } = require("eva-utilities").utilities.errors;
const makeaddPermissionAction = require("./add-permission");
const makeupdatePermissionAction = require("./update-permission");
const config = require("../../config");
// const makeGetUserById = require('./get-user-by-id');
const { addPermission, updatePermission } = require("../../usecase/permission");

const addPermissionAction = makeaddPermissionAction({
  createErrorResponse,
  createSuccessResponse,
  addPermission,
});

const updatePermissionAction = makeupdatePermissionAction({
  createErrorResponse,
  createSuccessResponse,
  updatePermission,
});

module.exports = {
  addPermissionAction,
  updatePermissionAction,
};
