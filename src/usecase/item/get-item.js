const { date } = require("joi");

module.exports = function ({ ItemDb, NotFoundError, UnknownError }) {
  return async ({ item_code, logger }) => {
    console.log("USECASE");

    try {
      const Items = await ItemDb.getItem({
        item_code,
        logger,
      });

      return Items;
    } catch (err) {
      logger.error("Error in addItem use-case:", err.message);
      throw err;
    }
  };
};
