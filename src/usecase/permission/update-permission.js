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
    // Create user
    let permission;
    try {
      permission = await permissionDb.updatePermission({
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
      if (err instanceof NotFoundError) {
        console.log("User doesn't exist, proceed with registration");
        // User doesn't exist, proceed with registration
      } else {
        throw err;
      }
    }

    return {
      permission,
    };
  };
};
