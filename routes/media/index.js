const express = require("express");
const getQualitiy = require("./getQualitiy");
const moveFilesBucketToFolder = require("./moveFilesBucketToFolder");
let mediaRoute = express.Router();


mediaRoute.get("/getQualitiy",getQualitiy)
mediaRoute.get("/moveFilesBucketToFolder",moveFilesBucketToFolder)

module.exports=mediaRoute;