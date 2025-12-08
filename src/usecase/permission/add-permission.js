const { date } = require("joi");

module.exports = function ({
  config,
  permissionDb,
  NotFoundError,
  UnknownError,
  joi,
}) {
  return async ({
    userid,
    user_id,
    module_code,
    can_create,
    can_update,
    can_delete,
    can_view,
    logger,
  }) => {
    // save permission
    let permission;
    try {
      permission = await permissionDb.addPermission({
        userid,
        user_id,
        module_code,
        can_create,
        can_update,
        can_delete,
        can_view,
        logger,
      });
    } catch (err) {
      // if user not found
      if (err instanceof NotFoundError) {
        console.log("User doesn't exist, continue");
      } else {
        throw err; // other db error
      }
    }

    // return response
    return {
      permission,
    };
  };
};
