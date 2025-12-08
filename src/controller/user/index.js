const createSuccessResponse =
  require("eva-utilities").utilities.createSuccessResponse;
const createErrorResponse =
  require("eva-utilities").utilities.createErrorResponse;
const { UnAuthenticatedError } = require("eva-utilities").utilities.errors;
const makeRegisterUserAction = require("./register-user-action");
const makeloginUserAction = require("./login-user-action");
const makeupdatePasswordAction = require("./update-password-action");
const makesoftdeleteUserAction = require("./soft-delete-user");
const makeupdateProfileAction = require("./update-profile-action");
const makeharddeleteUserAction = require("./hard-delete-user");
const makelogoutUserAction = require('./logout-user');
const config = require("../../config");
const makeGetUserById = require("./get-user-by-id");
const {
  getUserById,
  registerUser,
  loginUser,
  updatePassword,
  updateProfile,
  softdeleteUser,
  harddeleteUser,
} = require("../../usecase/user");

const GetUserByIdAction = makeGetUserById({
  createErrorResponse,
  createSuccessResponse,
  getUserById,
});

const registerUserAction = makeRegisterUserAction({
  createErrorResponse,
  createSuccessResponse,
  registerUser,
});

const loginUserAction = makeloginUserAction({
  loginUser,
});

const updatePasswordAction = makeupdatePasswordAction({
  createErrorResponse,
  createSuccessResponse,
  updatePassword,
});

const updateProfileAction = makeupdateProfileAction({
  createErrorResponse,
  createSuccessResponse,
  updateProfile,
});

const softdeleteUserAction = makesoftdeleteUserAction({
  createErrorResponse,
  createSuccessResponse,
  softdeleteUser,
});

const harddeleteUserAction = makeharddeleteUserAction({
  createErrorResponse,
  createSuccessResponse,
  harddeleteUser,
});

const logoutUserAction = makelogoutUserAction({
  createErrorResponse,
  createSuccessResponse,
})
module.exports = {
  GetUserByIdAction,
  registerUserAction,
  loginUserAction,
  updatePasswordAction,
  updateProfileAction,
  softdeleteUserAction,
  harddeleteUserAction,
  logoutUserAction
};
