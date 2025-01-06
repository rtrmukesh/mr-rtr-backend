const FaceRekognitionService = require("../../services/FaceRekognitionService");

const faceCompare = async (req, res, next) => {
  let response = await FaceRekognitionService.faceCompare(req?.file);
  console.log('response>>>------------------------> ', response);
};
module.exports = faceCompare;
