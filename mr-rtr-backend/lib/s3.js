const fs = require("fs");
const AWS = require("aws-sdk");
const config = require("./config");
const async = require("async");
const archiver = require("archiver");
const restify = require("restify");
const sharp = require("sharp");
const path = require("path");
const errors = require("restify-errors");
const request = require("request-promise");
const systemLog = require("../services/SystemLogService");

const SETTING = require("../helpers/Setting");

const getS3Config = async () => {
  try {

    const accessKeyId = config.aws.awsKeyId;

    const secretAccessKey = config.aws.awsSecretKey;

    /**
     * Update AWS config
     */
    await AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });

    const s3 = new AWS.S3();
    return s3;
  } catch (error) {
    console.log(error);
  }
};

const s3Utils = (module.exports = {

  uploadLocalAttachmentToS3: async (localFilePath, uploadFilePath, callback) => {

    const s3 = await getS3Config();

    const fileContent = fs.readFileSync(localFilePath);

    let params = {
      Bucket: config.aws.awsBucketName,
      Key: uploadFilePath,
      Body: fileContent,
      ACL: "public-read"
    };

    //notice use of the upload function, not the putObject function
    s3.putObject(params, (err) => {
      if (err) {
        return callback(err);
      }
      return callback();
    });
  },

  uploadFile: (file, uploadPath, visibility, callback) => {

    fs.readFile(file, async (err, fileContent) => {
      if (err) {
        return callback(err);
      }
      if (fileContent) {
        sharp(fileContent)
          .resize(600) // New width in pixels
          .toBuffer((err, outputImageBuffer) => {
            if (err) {
              console.error('Error resizing image:', err);
            } else {
              
              fs.unlink(file, function (err) { });

              return s3Utils.uploadFileContents(outputImageBuffer, uploadPath, visibility, callback);
            }
          });
      }
    });
  },

  uploadFileContents: async (fileContent, uploadPath, visibility, callback) => {

    const s3 = await getS3Config();

    let params = {
      Bucket: config.aws.awsBucketName,
      Key: uploadPath,
      Body: fileContent,
      ContentType: "view" || "download"
    };

    if (visibility) {
      params.ACL = "public-read";
    } else {
      params.ACL = "private";
    }

    s3.putObject(params, (err) => {
      if (err) {
        return callback(err);
      }
      return callback();
    });
  },

  getAllFiles: async (folderPath, callback) => {
    const files = [];

    const s3 = await getS3Config();

    s3.listObjects(
      { Bucket: config.aws.awsBucketName, Prefix: folderPath },
      (err, data) => {
        if (err) {
          return callback(err);
        }

        data.Contents.forEach((fileDetail) => {
          files.push(fileDetail.Key);
        });

        return callback(null, files);
      }
    );
  },

  getFileDetail: async (filePath, callback) => {

    const s3 = await getS3Config();

    s3.getObject(
      { Bucket: config.aws.awsBucketName, Key: filePath },
      (err, data) => {
        if (err) {
          return callback(err);
        }

        callback(null, data.Body);
      }
    );
  },

  downloadFiles: (folderPath, callback) => {
    s3Utils.getAllFiles(folderPath, (err, files) => {
      if (err) {
        return callback(err);
      }

      if (files.length === 0) {
        return callback(new errors.NotFoundError("Images not found"));
      }

      const zipFile = archiver("zip");

      async.each(
        files,
        (file, cb) => {
          s3Utils.getFileDetail(file, (err, fileDetail) => {
            if (err) {
              return cb(err);
            }

            zipFile.append(fileDetail, {
              name: file.replace(`${folderPath}/`, ""),
            });
            return cb();
          });
        },
        (err) => {
          if (err) {
            return callback(err);
          }

          zipFile.finalize();

          return callback(null, zipFile);
        }
      );
    });
  },

  getFile: async (filePath, callback) => {
    try {
      const s3 = await getS3Config();

      return s3.getObject(
        {
          Bucket: config.aws.awsBucketName,
          Key: filePath,
        },
        callback
      );
    } catch (err) {
      return null
    }
  },

  delFile: async (filePath, callback) => {

    const s3 = await getS3Config();

    const params = {
      Bucket: config.aws.awsBucketName,
      Key: filePath,
    };

    s3.deleteObject(params, (err) => {
      if (err) {
        return callback(err);
      }

      return callback();
    });
  },

  renameFile: async (filePath, newPath, callback) => {
    const s3 = await getS3Config();

    if (filePath === newPath) {
      return callback();
    }

    const params = {
      Bucket: config.aws.awsBucketName,
      CopySource: encodeURI(`${config.aws.awsBucketName}/${filePath}`),
      Key: newPath,
    };

    s3.copyObject(params, (err) => {
      if (err) {
        return callback(err);
      }

      return s3Utils.delFile(filePath, callback);
    });
  },

  uploadBase64File: async (base64, newPath, callback) => {

    const s3 = await getS3Config();

    const buffer = new Buffer(
      base64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const params = {
      Bucket: config.aws.awsBucketName,
      Key: newPath,
      Body: base64,
      ContentEncoding: "base64",
      ContentType: "image/png",
    };

    s3.putObject(params, (err) => {
      if (err) {
        return callback(err);
      }


      sharp(buffer)
        .resize(50)
        .toBuffer()
        .then((data) => {
          const extension = path.extname(newPath);
          params.Body = data;
          params.Key = `${path.dirname(newPath)}/${path.basename(
            newPath,
            extension
          )}-thumb${extension}`;

          s3.putObject(params, (err) => {
            if (err) {
              return callback(err);
            }

            return callback();
          });
        })
        .catch((err) => callback(err));
    });
  },

  createFolder: async (folderName) => {
    const s3 = await getS3Config();
    var params = { Bucket: config.aws.awsBucketName, Key: folderName, ACL: 'public-read', Body: "Media" };
    s3.upload(params, function (err, data) {
      if (err) {
        console.log("Error creating the folder: ", err);
      } else {
        console.log("Successfully created a folder on S3");

      }
    });

  },

  listBuckets: async () => {
    const s3 = await getS3Config();
    s3.listBuckets(function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data.Buckets);
      }
    });
  },


  listObjectsInBucket: async () => {
    const s3 = await getS3Config();
    // Create the parameters for calling listObjects
    var bucketParams = {
      Bucket: config.aws.awsBucketName,
    };

    // Call S3 to obtain a list of the objects in the bucket
    s3.listObjects(bucketParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
  },

  isExist: async (folderName) => {
    const s3 = await getS3Config();

    s3.headObject({ Bucket: config.aws.awsBucketName, Key: folderName }, (err, data) => {

      if (err && err.code === 'NotFound') resolve(false)
      else if (err) reject(err)
      resolve(true)
    })
  },

  /**
 * Upload From Url To S3
 */
  UploadFromUrlToS3: (url, destPath) => {

    return new Promise(async (resolve, reject) => {

      const s3 = await getS3Config();

      request(
        {
          url: url,
          encoding: null,
          headers: {
            ["User-Agent"]:
              "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
            Accept: "*/*",
          },
          json: true,
        },
        function (err, res, body) {
          if (err) {
            reject(err);
          }

          var objectParams = {
            ContentType: res && res.headers["content-type"],
            ContentLength: res && res.headers["content-length"],
            Key: destPath,
            Body: body,
            Bucket: config.aws.awsBucketName,
            ACL: "public-read"
          };

          resolve(s3.putObject(objectParams).promise());
        }
      );
    });
  },

  UpdateACH: async (path, public, req) => {

    return new Promise(async (resolve, reject) => {

      const s3 = await getS3Config();

      let s3ParamsObject = new Object();

      s3ParamsObject.Bucket = config.aws.awsBucketName;

      s3ParamsObject.Key = path;

      if (public) {
        s3ParamsObject.ACL = "public-read"
      } else {
        s3ParamsObject.ACL = "private"
      }

      s3.putObjectAcl(s3ParamsObject, (err, data) => {

        if (err && err.code === 'NoSuchKey') {
          systemLog.create(`S3 ACH Updation Error : ${err.code} - filePath : ${path} - public : ${public}`, req)
          resolve(false)
        } else if (err) {
          reject(err)
        }
        resolve(true)
      })
    })
  },
});
