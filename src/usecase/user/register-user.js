module.exports = function ({
  config,
  userDb,
  NotFoundError,
  UnknownError,
  randomUUID,
  createHash,
  nodemailer,
  joi,
}) {
  return async ({
    userid,
    username,
    password,
    address1,
    address2,
    phone_number,
    logger,
  }) => {
    console.log("USEC");

    // ---- CHECK EXISTING USER ----
    const existingUser = await userDb.getUserByUsername({ username, logger });

    if (existingUser.user) {   // <--- check the .user property
      logger.error("User with this username already exists");
      throw new Error("User with this username already exists");
    }

    // ---- HASH PASSWORD ----
    // const hashedPassword = await createHash(password); // optional

    // ---- CREATE USER ----
    const user = await userDb.createUser({
      userid,
      username,
      password, // OR hashedPassword
      address1,
      address2,
      phone_number,
      created_at: new Date(),
      is_deleted: false,
      deleted_by: null,
      deleted_at: null,
      is_admin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      logger,
    });

    return { user };
  };
};
