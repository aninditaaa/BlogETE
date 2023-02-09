const express =  require("express");
const authRouter = express.Router();

const {register,login,reset,loginMiddleware} = require("./controllers");

authRouter.post("/register",register);
authRouter.post("/login",loginMiddleware,login);
authRouter.post("/reset",loginMiddleware,reset);

module.exports = {authRouter};