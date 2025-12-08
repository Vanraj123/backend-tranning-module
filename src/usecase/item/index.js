const {
  userDb,
  permissionDb,
  permissionmoduleDb,
  ItemDb,
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

const makeadditem = require("./add-item");
const makegetitem = require("./get-item");
const makeupdateitem = require("./update-item");
// const makeupdatePermission = require("./update-permission");

const additem = makeadditem({
  ItemDb: ItemDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

const getitem = makegetitem({
  ItemDb: ItemDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

const updateitem = makeupdateitem({
  ItemDb: ItemDb,
  NotFoundError,
  UnknownError,
  config,
  joi,
});

module.exports = {
  additem,
  getitem,
  updateitem,
};
//
