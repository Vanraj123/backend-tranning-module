const { userDb } = require("../../data-access");
const {
  NotFoundError,
  UnknownError,
  UnAuthenticatedError,
  UnAuthorizedError,
} = require("eva-utilities/utils/errors");

const { hash } = require("eva-utilities").utilities;
const Redis = require("eva-utilities").libraries.redis;
const config = require("../../config");
const crypto = require("node:crypto");

const createHash = hash();
const joi = require("joi");
const nodemailer = require("nodemailer");

console.log(userDb);
const makeGetUserById = require("./get-user-by-id");
const getUserById = makeGetUserById({
  joi,
  userDb: userDb,
});

const makeRegisterUser = require("./register-user");
const registerUser = makeRegisterUser({
  userDb: userDb,
  NotFoundError,
  UnknownError,
  config,
  randomUUID: crypto.randomUUID,
  createHash,
  nodemailer,
  joi,
});

const makeloginUser = require("./login-user");
const loginUser = makeloginUser({
  userDb: userDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

const makeupdatePassword = require("./update-password-user");
const updatePassword = makeupdatePassword({
  userDb: userDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

const makeupdateProfile = require("./update-profile-user");
const updateProfile = makeupdateProfile({
  userDb: userDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

const makesoftdeleteUser = require("./softdelete-user");
const softdeleteUser = makesoftdeleteUser({
  userDb: userDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

const makeharddeleteUser = require("./harddelete-user");
const harddeleteUser = makeharddeleteUser({
  userDb: userDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

module.exports = {
  getUserById,
  registerUser,
  loginUser,
  updatePassword,
  updateProfile,
  softdeleteUser,
  harddeleteUser,
};
