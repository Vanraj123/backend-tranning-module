const { userDb, permissionDb } = require("../../data-access");
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

const makeaddPermission = require("./add-permission");
const makeupdatePermission = require("./update-permission");

const addPermission = makeaddPermission({
  permissionDb: permissionDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

const updatePermission = makeupdatePermission({
  permissionDb: permissionDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

module.exports = {
  addPermission,
  updatePermission,
};
//
