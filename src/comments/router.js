const express = require("express");
const commentRouter = express.Router();

const {writeComment,deleteComment,updateComment,readComment} = require("./controllers");

commentRouter.post("/writecomment",writeComment);
commentRouter.post("/deletecomment",deleteComment);
commentRouter.post("/updatecomment",updateComment);
commentRouter.get("/readcomment",readComment);

module.exports = {commentRouter};