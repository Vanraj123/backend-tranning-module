const {
  userDb,
  permissionDb,
  permissionmoduleDb,
} = require("../../data-access");
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
const makeaddPermissionmodule = require("./add-permissionmodule");
const makeupdatePermissionmodule = require("./update-permissionmodule");
const makedeletePermissionmodule = require("./delete-permissionmodule");
const addPermissionmodule = makeaddPermissionmodule({
  permissionmoduleDb: permissionmoduleDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

const updatePermissionmodule = makeupdatePermissionmodule({
  permissionmoduleDb: permissionmoduleDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

const deletePermissionmodule = makedeletePermissionmodule({
  permissionmoduleDb: permissionmoduleDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});
module.exports = {
  addPermissionmodule,
  updatePermissionmodule,
  deletePermissionmodule,
};
