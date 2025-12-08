module.exports = function ({ userDb, joi }) {
  // console.log(userDb);
  return async function () {
    // console.log("HII USECASE");

    user = await userDb.hardDeleteUser();

    return {
      user,
    };
  };
};
