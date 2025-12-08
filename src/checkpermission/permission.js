const PostgresDb = require("../utils/lib/postgres");
const CockroachDb = require("eva-utilities").libraries.cockroachDb;
const { UnknownError } = require("eva-utilities").utilities.errors;
const config = require("../config");

const cockroachDb = new PostgresDb({
  ...config.postgres,
  logger: console.log,
});

// --------------------- CHECK VIEW ---------------------
const checkcanview = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const query = `SELECT * FROM "UserPermissions" WHERE user_id = $1`;
    const result = await cockroachDb.query(query, [userId]);
    const userPermission = result.rows[0];

    if (userPermission && userPermission.can_view === true || userId == req.session.user.id) {
      return next();
    } else {
      return res
        .status(403)
        .json({
          status: "error",
          message: "User does not have view permission",
        });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch permission" });
  }
};

// --------------------- CHECK CREATE ---------------------
const checkcancreate = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const query = `SELECT * FROM "UserPermissions" WHERE user_id = $1`;
    const result = await cockroachDb.query(query, [userId]);
    const userPermission = result.rows[0];

    if (userPermission && userPermission.can_create === true) {
      return next();
    } else {
      return res
        .status(403)
        .json({
          status: "error",
          message: "User does not have create permission",
        });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch permission" });
  }
};

const islogin = async (req,res,next) => {

  if (!req.session || !req.session.user) {
        return res.json({
          success: true,
          message: "Login Please",
        });
      }else {
        return next();
      }
}
// --------------------- CHECK UPDATE ---------------------
const checkcanupdate = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const query = `SELECT * FROM "UserPermissions" WHERE user_id = $1`;
    const result = await cockroachDb.query(query, [userId]);
    const userPermission = result.rows[0];

    if (userPermission && userPermission.can_update == true) {
      return next();
    } else {
      return res
        .status(403)
        .json({
          status: "error",
          message: "User does not have update permission",
        });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch permission" });
  }
};

// --------------------- CHECK DELETE ---------------------
const checkcandelete = async (req, res, next) => {
  try {
    const userId = req.session.user.id;
    const query = `SELECT * FROM "UserPermissions" WHERE user_id = $1`;
    const result = await cockroachDb.query(query, [userId]);
    const userPermission = result.rows[0];

    if (userPermission && userPermission.can_delete === true) {
      return next();
    } else {
      return res
        .status(403)
        .json({
          status: "error",
          message: "User does not have delete permission",
        });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch permission" });
  }
};

const isadmin = async (req, res, next) => {
  try {
    console.log(req.session.user);
    if (req.session.user && req.session.user.is_admin === true) {
      return next();
    } else {
      return res
        .status(403)
        .json({ status: "error", message: "You are not admin" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to validate admin access" });
  }
};

module.exports = {
  checkcanview,
  checkcancreate,
  islogin,
  checkcanupdate,
  checkcandelete,
  isadmin,
};
