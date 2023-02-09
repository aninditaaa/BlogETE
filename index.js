const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express();
const {authRouter} = require("./src/auth/router");
const {blogRouter} = require("./src/blogs/router");
const {commentRouter} = require("./src/comments/router");

mongoose.connect("mongodb://127.0.0.1:27017/blog");
mongoose.connection.on("connected", ()=>{
    console.log("DB Connected with Blog")
})
mongoose.connection.on("error",(e)=>{
    console.log("Connection Error");
})

app.use(cors());
app.use(bodyParser.json());
app.use("/auth",authRouter);
app.use("/blog",blogRouter);
app.use("/comment",commentRouter);

app.listen(4000, ()=>{
    console.log("Server started on Port 4000");
})