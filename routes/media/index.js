const express = require("express");
const getQualitiy = require("./getQualitiy");
let mediaRoute = express.Router();


mediaRoute.get("/getQualitiy",getQualitiy)

module.exports=mediaRoute;