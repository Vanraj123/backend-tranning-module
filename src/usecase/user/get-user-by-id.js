module.exports = function ({ userDb, joi }) {
  console.log(userDb);
  return async function ({ id, userId, logger }) {
    // console.log("HII USECASE"); for debug
    const user = await userDb.getUserById({
      id,
      userId,
      logger,
    });

    return {
      user,
    };
  };
};
