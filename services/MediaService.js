const youtubedl = require('youtube-dl-exec');

const AWS = require('aws-sdk');
const config = require('../lib/config');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION 
});

const s3 = new AWS.S3();

class VideoService {

    static async checkAndCreateFolder  (bucketName, folderName)  {
        try {
          const params = {
            Bucket: bucketName,
            Prefix: `${folderName}/`, 
            MaxKeys: 1
          };
      
          const data = await s3.listObjectsV2(params).promise();
          if (data?.Contents?.length === 0) {
            const createParams = {
              Bucket: bucketName,
              Key: `${folderName}/` 
            };
            await s3.putObject(createParams).promise();
            console.log(`Folder '${folderName}' created.`);
          } else {
            console.log(`Folder '${folderName}' already exists.`);
          }
        } catch (error) {
          console.error('Error checking or creating folder:', error);
        }
      };
      

    static getVideoQualities(videoUrl) {
        return new Promise((resolve, reject) => {
            youtubedl(videoUrl, {
                exec: 'python3.12', // Explicitly use Python 3.12
                dumpSingleJson: true,
                noCheckCertificates: true,
                noWarnings: true,
                preferFreeFormats: true,
                addHeader: ['referer:youtube.com', 'user-agent:googlebot']
              }).then((info) => {

                    const formats = info.formats
                        .filter((file) => file.url) // Ensure only formats with URLs are included
                        .map((file) => ({
                            id: file.format_id,
                            label: file.format_note || 'Unknown',
                            resolution: file.vcodec && file.height ? `${file.height}p` : 'Audio',
                            url: file.url,
                            format: file.mimeType || 'Unknown',
                        }));
                    resolve(formats);
                })
                .catch((err) => {
                    console.error('Error fetching qualities:', err);
                    reject(err);
                });
        });
    }


    // static downloadVideo(videoUrl, formatId, outputDir) {
    //     return new Promise((resolve, reject) => {
    //         const outputFilePath = path.join(outputDir, '%(title)s.%(ext)s');

    //         youtubedl(videoUrl, {
    //             format: formatId,
    //             output: outputFilePath,
    //         })
    //             .then((output) => {
    //                 console.log('Video downloaded successfully:', output);
    //                 resolve(output);
    //             })
    //             .catch((err) => {
    //                 console.error('Error downloading video:', err);
    //                 reject(err);
    //             });
    //     });
    // }

    static async getQualitiy(req, res, next) {
        let videoUrl = req.query.url;
        VideoService.getVideoQualities(videoUrl)
            .then((qualities) => {
                return res.status(200).json({ qualities });
            })
            .catch((err) => console.error('Error:', err));
    }


    static async moveFileToNewFolder(bucketName, fileName, destinationFolder) {
        try {
          const listParams = { Bucket: bucketName };
          const data = await s3?.listObjectsV2(listParams).promise();
      
          const fileObject = data?.Contents?.find((obj) => obj?.Key?.endsWith(fileName));
          if (!fileObject) {
            console.log(`File '${fileName}' not found in bucket '${bucketName}'.`);
            return;
          }
      
          const fileKey = fileObject?.Key; 
          const folderPath = fileKey?.substring(0, fileKey?.lastIndexOf('/') + 1); 
      
          console.log(`File found: ${fileKey}, Folder path: ${folderPath}`);
      
          const folderFiles = data?.Contents?.filter(
            (obj) => obj?.Key?.startsWith(folderPath) && !obj?.Key?.endsWith('/')
          );
          console.log(`Files in the folder '${folderPath}':`, folderFiles?.map((f) => f?.Key));
      
          for (const file of folderFiles) {
            const sourceKey = file?.Key;
            if (sourceKey?.startsWith(destinationFolder)) {
                console.log(`Skipping already moved file: '${sourceKey}'`);
                continue;
            }
            const destinationKey = sourceKey?.replace(folderPath, `${destinationFolder}/`);
      
            const copyParams = {
              Bucket: bucketName,
              CopySource: `${bucketName}/${sourceKey}`,
              Key: destinationKey,
            };
            await s3.copyObject(copyParams).promise();
      
            const deleteParams = {
              Bucket: bucketName,
              Key: sourceKey,
            };
            await s3.deleteObject(deleteParams).promise();
      
            console.log(`Moved file: '${sourceKey}' to '${destinationKey}'`);
          }
          console.log(`All files moved to '${destinationFolder}' folder.`);
          return 
        } catch (error) {
          console.error('Error moving file and folder:', error);
        }
      }
      

    static moveFilesToNewFolder = async (req,res,next) => {
        let bucketName =config.aws.awsBucketName
        const newFolderName = 'newFolder';
        let fileNames =["source_1735924427949.jpg","533-200x300.jpg","Screenshot from 2024-12-21 15-10-03.png","visitor-597-image.png","Screenshot from 2024-12-31 14-11-53.png","662e008a-fb59-429c-9931-5cfe7c20fb14.jpeg","qwertyuiop.png","Screenshot from 2024-12-21 15-10-03.png","visitor-597-image.png","Screenshot_20241203-122908.png","Screenshot_20241217-205538.png"]
      
        // Check and create folder if necessary
        await this.checkAndCreateFolder(bucketName, newFolderName);
      
        for (const fileName of fileNames) {
          await this.moveFileToNewFolder(bucketName, fileName, newFolderName);
        }
         return res.status(200).json({message:"Moved Successfully"})
      };
      
}

module.exports = VideoService



