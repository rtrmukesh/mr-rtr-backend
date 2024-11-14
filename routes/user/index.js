const express = require("express");
const login = require("./login");
const signUp = require("./signUp");
let userRoute = express.Router();


userRoute.post("/loginByPassword",login)
userRoute.post("/signup",signUp)

module.exports=userRoute;