const { uploadItemImages } = require("../../middleware/upload-service");

module.exports = function ({
  createErrorResponse,
  createSuccessResponse,
  updateitem,
}) {
  return async (req, res) => {
    const logger = req.log;
    try {
      const created_by = req.session.user.id;
      const { item_code, description, length, breadth, height } = req.body;

      const files = req.files || [];

      // Upload images to MinIO
      const pictures = await uploadItemImages({
        item_code,
        version: 1,
        files,
      });

      // Save in DB
      const insertedItems = await updateitem({
        item_code,
        description,
        item_pictures: pictures,
        length: Number(length),
        breadth: Number(breadth),
        height: Number(height),
        created_by,
        logger,
      });

      res.status(201).json({ Status: "Success", data: insertedItems });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ Status: "Error", data: err.message });
    }
  };
};
