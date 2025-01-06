const express = require("express");
const faceCompare = require("./faceCompare");
let faceRekognition = express.Router();


faceRekognition.post("/compare",faceCompare)
faceRekognition.post("/searchFace",searchFaceByUsingIndex)

module.exports=faceRekognition;