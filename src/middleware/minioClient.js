const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "minio",
  port: Number(process.env.MINIO_PORT) || 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ROOT_USER || "minioadmin",
  secretKey: process.env.MINIO_ROOT_PASSWORD || "minioadmin",
});

const BUCKET = "items";

async function ensureBucket() {
  try {
    const exists = await minioClient.bucketExists(BUCKET);
    if (!exists) {
      await minioClient.makeBucket(BUCKET, "us-east-1");
      console.log(`Bucket '${BUCKET}' created`);
    }
  } catch (err) {
    console.error("MinIO Error:", err);
  }
}

module.exports = { minioClient, BUCKET, ensureBucket };
