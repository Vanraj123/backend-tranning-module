module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  getitem,
}) {
  return async (req, res) => {
    const logger = req.log;
    try {
      // Save item in DB
      const Items = await getitem({
        item_code: req.body.item_code,
        logger,
      });

      res.status(201).json({ Status: "Success", data: Items });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ Status: "Error", data: err.message });
    }
  };
};
