const MediaService = require("../../services/MediaService");

const getQualitiy = async (req, res, next) => {
  await MediaService.getQualitiy(req, res, next);
};
module.exports = getQualitiy;
