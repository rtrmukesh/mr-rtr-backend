const FaceRekognitionService = require("../../services/FaceRekognitionService");

const searchFaceByUsingIndex = async (req, res, next) => {
    let mediaFile = req?.file
    let response = await FaceRekognitionService.searchFaceByUsingIndex(mediaFile);
    console.log('response>>>------------------------> ', response);
};
module.exports = searchFaceByUsingIndex;
