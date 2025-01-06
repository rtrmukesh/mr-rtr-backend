const AWS = require("aws-sdk");
const ArrayList = require("../lib/ArrayList");
require("dotenv").config();

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const rekognition = new AWS.Rekognition();
const s3 = new AWS.S3();

const bucketName = process.env.AWS_BUCKET_NAME;
const collectionId = process.env.REKOGNITION_COLLECTION_ID;

class FaceRekognitionService {

  static async checkAndCreateBucket(bucketName) {
    const params = { Bucket: bucketName };
    try {
      await s3.headBucket(params).promise();
      console.log(`Bucket "${bucketName}" already exists.`);
    } catch (err) {
      if (err.statusCode === 404) {
        console.log(`Bucket "${bucketName}" does not exist. Creating...`);
        await s3.createBucket({ Bucket: bucketName, ACL: "private" }).promise();
        console.log(`Bucket "${bucketName}" created successfully.`);
      } else {
        throw err;
      }
    }
  }

  static async faceCompare(file, res) {
    try {
      const sourceImage = file?.buffer;
      if (!sourceImage) {
        throw new Error("No image provided.");
      }

      const bucketName = process.env.AWS_BUCKET_NAME;
      await this.checkAndCreateBucket(bucketName);

      const { Contents: targetKeys } = await s3.listObjectsV2({ Bucket: bucketName }).promise();
      if (!targetKeys || targetKeys.length === 0) {
        throw new Error("No images found in the bucket.");
      }

      for (let { Key } of targetKeys) {
        if (!Key.match(/\.(jpg|jpeg|png)$/)) {
          console.log(`Skipping non-image file: ${Key}`);
          continue;
        }

        const targetImageParams = {
          Image: { S3Object: { Bucket: bucketName, Name: Key } },
          Attributes: ["DEFAULT"],
        };
        const faceDetection = await rekognition.detectFaces(targetImageParams).promise();

        if (!faceDetection?.FaceDetails || faceDetection?.FaceDetails?.length === 0) {
          continue;
        }

        const rekognitionParams = {
          SourceImage: { Bytes: sourceImage },
          TargetImage: { S3Object: { Bucket: bucketName, Name: Key } },
          SimilarityThreshold: 80,
        };

        try {
          const result = await rekognition.compareFaces(rekognitionParams).promise();
          console.log(`Rekognition result for ${Key}:`, result);

          if (result.FaceMatches && result?.FaceMatches?.length > 0) {
            return {
              matchedImageKey: Key,
              similarity: result?.FaceMatches[0]?.Similarity,
            };
          }
        } catch (compareErr) {
          console.error(`Error comparing faces for ${Key}:`, compareErr.message);
        }
      }

      throw new Error("No matching face found.");
    } catch (err) {
      console.error("Error during face recognition:", err);
      throw new Error(`Error during face recognition:-> ${err}`);
    }
  }


  static async uploadToS3(file) {
    const fileContent = fs.readFileSync(file.path);

    const params = {
      Bucket: bucketName,
      Key: file.name,
      Body: fileContent,
      ContentType: file.type,
    };
    return s3.upload(params).promise();
  }

  // Add face to collection
  static async indexFaceToCollection(fileName) {
    try {
      /* ✴---Check and create collection---✴ */
      await this.checkAndCreateCollection(collectionId);

      const params = {
        CollectionId: collectionId,
        Image: {
          S3Object: {
            Bucket: bucketName,
            Name: fileName,
          },
        },
        ExternalImageId: fileName,
      };
      return rekognition.indexFaces(params).promise();
    } catch (error) {
      console.log(error);
    }
  }

  // Search faces by source image
  static async searchFacesByImage(bucketName, fileName, collectionId) {
    const params = {
      CollectionId: collectionId,
      Image: {
        S3Object: {
          Bucket: bucketName,
          Name: fileName,
        },
      },
      FaceMatchThreshold: 80, // Minimum similarity threshold
      MaxFaces: 1000, // Limit the number of matches returned
    };

    return rekognition.searchFacesByImage(params).promise();
  }

  static async checkAndCreateCollection(collectionId) {
    try {
      const params = {
        CollectionId: collectionId,
      };

      // Try to describe the collection to check if it exists
      await rekognition.describeCollection(params).promise();
      console.log(`Collection ${collectionId} already exists.`);
    } catch (err) {
      // If collection does not exist, create it
      if (err.code === 'ResourceNotFoundException') {
        console.log(`Collection ${collectionId} not found. Creating it...`);
        const createParams = {
          CollectionId: collectionId,
        };
        await rekognition.createCollection(createParams).promise();
        console.log(`Collection ${collectionId} created successfully.`);
      } else {
        throw new Error(`Error checking or creating collection: ${err.message}`);
      }
    }
  }

  static async deleteFromS3(file) {

    const params = {
      Bucket: bucketName,
      Key: file.name,
    };

    try {
      await s3.deleteObject(params).promise();
      console.log(`Successfully deleted file: ${file.name}`);
    } catch (err) {
      console.error(`Error deleting file ${file.name}:`, err.message);
    }
  }

  static async searchFaceByUsingIndex(file) {
    try {

      /* ✴---Check and create collection---✴ */
      await this.checkAndCreateCollection(collectionId);

      await this.uploadToS3(file);

      const searchResponse = await this.searchFacesByImage(bucketName, file.name, collectionId);
      await this.deleteFromS3(file)
      if (ArrayList.isArray(searchResponse.FaceMatches)) {
        searchResponse.FaceMatches.sort((a, b) => {
          const fileA = a?.Face?.ExternalImageId;
          const fileB = b?.Face?.ExternalImageId;

          const timestampA = fileA?.split('-')[0];
          const timestampB = fileB?.split('-')[0];

          return parseInt(timestampB) - parseInt(timestampA);
        })

        const matches = searchResponse.FaceMatches.map((match) => ({
          fileName: match?.Face?.ExternalImageId,
          similarity: `${match?.Similarity}%`,
        }));
        return { sourceFile: file?.name, matches };
      } else {
        console.log(`No matches found for file: ${file?.name}`);
        await this.deleteFromS3(file)
        throw { message: "No matching faces found." };
      }
    } catch (err) {
      console.error(`Error processing file ${file?.name}:`, err.message);
      await this.deleteFromS3(file)
      throw { error: "Error comparing faces." }
    }
  }
}

module.exports = FaceRekognitionService;
