import AWS from "aws-sdk";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

const client = new AWS.S3({
  region: process.env.AWSREGION,
  accessKeyId: process.env.AWSACCESSKEY,
  secretAccessKey: process.env.AWSSECRETKEY,
});

/**
 * @param {Buffer} file
 * @returns {String}
 */
export async function uploadImage(file) {
  const params = {
    Bucket: process.env.AWSBUCKET,
    Key: file.originalname,
    Body: file.buffer,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: file.mimetype,
  };

  try {
    const result = await client.upload(params).promise();

    return {
      bucket: result.Bucket,
      filename: result.Key,
      url: result.Location,
      eTag: result.ETag,
      versionId: result.VersionId,
    };
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * @param {String} filename
 * @returns {String}
 */
export async function deleteImage(filename) {
  const params = {
    Bucket: process.env.AWSBUCKET,
    Key: filename,
  };

  try {
    const result = await client.deleteObject(params).promise();

    return {
      success: result.DeleteMarker,
      versionId: result.VersionId,
    };
  } catch (error) {
    throw new Error(error);
  }
}
