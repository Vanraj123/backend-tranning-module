const { date } = require("joi");

module.exports = function ({
  config,
  userDb,
  NotFoundError,
  UnknownError,
  joi,
}) {
  return async ({ username, password, logger }) => {
    console.log("USEC");

    // Create user
    let user;
    try {
      user = await userDb.logintoUser({
        username,
        password,
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
