import AWS from "aws-sdk";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

const client = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

/**
 * @param {Buffer} file
 * @returns {String}
 */
export async function uploadImage(file) {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: file.originalname,
    Body: file.buffer,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: file.mimetype,
  };

  try {
    const result = await client.upload(params).promise();

    return result;
  } catch (error) {
    throw new Error(error);
  }
}
