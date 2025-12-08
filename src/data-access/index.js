const PostgresDb = require("../utils/lib/postgres");
const CockroachDb = require("eva-utilities").libraries.cockroachDb;
const config = require("../config");
const { UnknownError, NotFoundError } = require("eva-utilities").utilities.errors;
const { buildQueryFromFilters, buildMultiSort } = require("eva-utilities/utils/filter-builder-v2");

const cockroachDb = new PostgresDb({
  ...config.postgres,
  logger: console.log,
});

const makeUserDb = require("./user-db");
const userDb = makeUserDb({
  cockroachDb,
  UnknownError,
  NotFoundError,
  buildQueryFromFilters,
  buildMultiSort,
});

const makePermissionDb = require('./permission-db');
const permissionDb = makePermissionDb({
  cockroachDb,
  UnknownError,
  NotFoundError,
  buildQueryFromFilters,
  buildMultiSort,
});

const makePermissionmoduleDb = require('./permissionmodule-db');
const permissionmoduleDb = makePermissionmoduleDb({
  cockroachDb,
  UnknownError,
  NotFoundError,
  buildQueryFromFilters,
  buildMultiSort,
})

const makeItemDb = require('./item-db');
const ItemDb = makeItemDb({
  cockroachDb,
  UnknownError,
  NotFoundError,
  buildQueryFromFilters,
  buildMultiSort,
})

console.log(userDb);
module.exports = {
  userDb,
  permissionDb,
  permissionmoduleDb,
  ItemDb
};
