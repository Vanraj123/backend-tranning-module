const { date } = require("joi");

module.exports = function ({
  config,
  permissionmoduleDb,
  NotFoundError,
  UnknownError,
  joi,
}) {
  return async ({ module_code, module_description, userid, logger }) => {
    // console.log("USEC");

    // Create user
    let permissionmodule;
    try {
      permissionmodule = await permissionmoduleDb.updatePermissionmodule({
        module_code,
        module_description,
        userid,
        logger,
      });
    } catch (err) {
      if (err instanceof NotFoundError) {
        console.log("User doesn't exist, proceed with registration");
        // User doesn't exist, proceed with registration
      } else {
        throw err;
      }
    }

    return {
      permissionmodule,
    };
  };
};
