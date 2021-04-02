import AWS from "aws-sdk";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

const client = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

/**
 * @param {String} file
 * @param {String} name
 * @returns {String}
 */
export async function uploadImage(file) {
  const { stream, name, type } = await file;
  const body = stream();

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: filename,
    Body: body,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: type,
  };

  console.log({ params });

  try {
    const result = await client.upload(params).promise();

    return result.location;
  } catch (error) {
    throw new Error(error);
  }
}
