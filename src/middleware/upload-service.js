const { minioClient, BUCKET } = require("./minioClient");
const path = require("path");

async function uploadItemImages({ item_code, version, files }) {
  const uploaded = [];

  for (const file of files) {
    const ext = path.extname(file.originalname);
    const objectName = `items/${item_code}/v${version}/${Date.now()}${ext}`;

    await minioClient.putObject(BUCKET, objectName, file.buffer, file.size);
    uploaded.push(objectName);
  }

  return uploaded; // store in DB
}

module.exports = { uploadItemImages };
