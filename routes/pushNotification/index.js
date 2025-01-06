const express = require("express");
const notification = require("./fireBaseNotification");
let pushNotification = express.Router();


pushNotification.post("/send",notification)

module.exports=pushNotification;