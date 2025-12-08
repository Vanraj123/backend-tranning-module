// const createSuccessResponse = require('../utils/create-success-response');
const createSuccessResponse = require("../utils/lib/create-success-response");

const makeHealthCheck = require("./makeHealthCheck");

const healthCheck = makeHealthCheck({
  createSuccessResponse: createSuccessResponse,
});

const makeMessage = require("./message");
const message = makeMessage({
  createSuccessResponse: createSuccessResponse,
});

module.exports = {
  healthCheck,
  message,
  userActions: require("./user"),
  permissionAction: require("./permission"),
  permissionmoduleAction: require("./permissionmodule"),
  itemActions: require("./item"),
};
