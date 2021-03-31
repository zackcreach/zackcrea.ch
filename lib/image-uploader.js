import AWS from "@aws-sdk";
import { Buffer } from "buffer";

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
export async function uploadImage(file, name) {
  const fileContent = new Buffer.from(
    file.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const type = base64.split(";")[0].split("/")[1];

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${name}.${type}`,
    Body: fileContent,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };

  try {
    const result = await client.upload(params).promise();

    return result.location;
  } catch (error) {
    throw new Error(error);
  }
}
