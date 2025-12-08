module.exports = function ({ userDb, joi }) {
  console.log(userDb);
  return async function ({ userid, id, logger }) {
    // console.log("HII USECASE");
    user = await userDb.softDeleteUser({
      userid,
      id,
      logger,
    });

    return {
      user,
    };
  };
};
