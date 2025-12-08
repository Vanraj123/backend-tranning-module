module.exports = function ({
  config,
  userDb,
  NotFoundError,
  UnknownError,
  joi,
}) {
  return async ({
    userid,
    username,
    password,
    address1,
    address2,
    phone_number,
    is_deleted,
    deleted_by,
    is_admin,
    logger,
  }) => {
    let user;

    try {
      // Check if user exists
      let existuser = await userDb.getUserByUsername({
        username,
        logger,
      });

      // User exists → update profile
      user = await userDb.updateuserProfile({
        userid,
        username,
        address1,
        address2,
        phone_number,
        is_deleted: false,
        deleted_by: null,
        deleted_at: null,
        is_admin: false,
        updatedAt: new Date(),
        logger,
      });
    } catch (err) {
      if (err instanceof NotFoundError) {
        console.log("User not found → cannot update profile");
        throw new NotFoundError("User not found");
      } else {
        throw err;
      }
    }

    return { user };
  };
};
