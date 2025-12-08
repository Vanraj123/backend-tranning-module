const { date } = require("joi");

module.exports = function ({ ItemDb, NotFoundError, UnknownError }) {
  return async ({
    item_code,
    description,
    item_pictures,
    length,
    breadth,
    height,
    created_by,
    logger,
  }) => {
    console.log("USECASE");

    try {
      const insertedItems = await ItemDb.updateItem({
        item_code,
        description,
        item_pictures, // array of file names
        length,
        breadth,
        height,
        created_by,
        logger,
      });

      return insertedItems;
    } catch (err) {
      logger.error("Error in addItem use-case:", err.message);
      throw err;
    }
  };
};
