const createSuccessResponse =
  require("eva-utilities").utilities.createSuccessResponse;
const createErrorResponse =
  require("eva-utilities").utilities.createErrorResponse;
const { UnAuthenticatedError } = require("eva-utilities").utilities.errors;
const makeadditemsAction = require("./add-item");
const makegetitemsAction = require("./get-item");
const makeupdateitemsAction = require("./update-item");
const config = require("../../config");
const { additem, getitem, updateitem } = require("../../usecase/item");

const additemsAction = makeadditemsAction({
  createErrorResponse,
  createSuccessResponse,
  additem,
});

const getitemsAction = makegetitemsAction({
  createErrorResponse,
  createSuccessResponse,
  getitem,
});

const updateitemsAction = makeupdateitemsAction({
  createErrorResponse,
  createSuccessResponse,
  updateitem,
});
module.exports = {
  additemsAction,
  getitemsAction,
  updateitemsAction,
};
