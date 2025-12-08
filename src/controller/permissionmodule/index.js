const createSuccessResponse =
  require("eva-utilities").utilities.createSuccessResponse;
const createErrorResponse =
  require("eva-utilities").utilities.createErrorResponse;
const { UnAuthenticatedError } = require("eva-utilities").utilities.errors;

const makeaddPermissionmoduleAction = require("./add-permissionmodule");
const makeupdatepermissionmoduleAction = require("./update-permissionmodule");
const makedeletepermissionmoduleAction = require("./delete-permissionmodule");

const config = require("../../config");

const {
  addPermissionmodule,
  updatePermissionmodule,
  deletePermissionmodule,
} = require("../../usecase/permissionmodule");

const addPermissionmoduleAction = makeaddPermissionmoduleAction({
  createErrorResponse,
  createSuccessResponse,
  addPermissionmodule,
});

const updatepermissionmoduleAction = makeupdatepermissionmoduleAction({
  createErrorResponse,
  createSuccessResponse,
  updatePermissionmodule,
});

const deletepermissionmoduleAction = makedeletepermissionmoduleAction({
  createErrorResponse,
  createSuccessResponse,
  deletePermissionmodule,
});
module.exports = {
  addPermissionmoduleAction,
  updatepermissionmoduleAction,
  deletepermissionmoduleAction,
};
