const MediaService = require("../../services/MediaService");

const moveFilesBucketToFolder = async (req, res, next) => {

  await MediaService.moveFilesToNewFolder(req, res, next);
};
module.exports = moveFilesBucketToFolder;
