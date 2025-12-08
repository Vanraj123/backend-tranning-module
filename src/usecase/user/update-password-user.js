const { date } = require("joi");

module.exports = function ({
  config,
  userDb,
  NotFoundError,
  UnknownError,
  joi,
}) {
  return async ({ id, newpassword, logger }) => {
    // console.log("USEC");

    // Hash password
    // const hashedPassword = createHash({
    //     data: password,
    //     secret: config.secrets.registerUser
    // });

    // Create user
    let user;
    try {
      user = await userDb.updateuserPassword({
        id, 
        newpassword,
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

    // Generate session
    // const sessionId = randomUUID();
    // await cache.set(
    //     `${config.auth.sessionPrefix}:${sessionId}`,
    //     JSON.stringify({
    //         user_id: user.id,
    //     }),
    //     config.auth.timeout
    // );

    // Remove sensitive data
    // delete user.password;

    // Generate verification URL
    // const verificationToken = randomUUID();
    // const verificationUrl = `http//:localhost:3000/session`;

    // Store verification token in cache
    // await cache.set(
    //     `VERIFY_EMAIL:${verificationToken}`,
    //     JSON.stringify({ user_id: user.id }),
    //     config.auth.timeout
    // );

    // console.log("url::", config.authUrl.domain + config.authUrl.route + `/${user.id}`);
    // Send verification URL
    // await sendURL({
    //     email,
    //     phoneNumber,
    //     url: config.authUrl.domain + config.authUrl.route + `/${user.id}`,
    //     logger
    // });

    return {
      // sessionId,
      user,
    };
  };

  async function validateUser({
    email,
    phoneNumber,
    fullname,
    createdBy,
    logger,
  }) {
    const schema = joi.object({
      email: joi.string().email().required(),
      phoneNumber: joi.string().optional(),
      fullname: joi.string().required(),
      createdBy: joi.string().required(),
    });

    try {
      await schema.validateAsync({ email, phoneNumber, fullname, createdBy });
    } catch (error) {
      logger.error(`Validation Error: ${error.message}`);
      throw new Error(`Validation Error: ${error.message}`);
    }
  }
};
