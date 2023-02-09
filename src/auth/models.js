const mongoose = require("mongoose");
const uuid = require("uuid");
var CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
    },
    name: String,
    email:{
        type:String,
        unique:true,
    },
    ency_password: String,
    salt: String,
    tokens:[{token:{
            type:String,
            required:true,
    }}]
},{timestamps:true});

userSchema.virtual("password").set(function (plainpassword) {
    this.salt = uuid.v4();
    this.ency_password = this.securePassword(plainpassword);
})

userSchema.methods = {
    securePassword: (plainpassword)=>{
        return CryptoJS.SHA256(plainpassword,this.salt).toString();
    },
    authenticate: function(plainpassword){
        return this.ency_password === this.securePassword(plainpassword);
    }
    }

const User = mongoose.model("User",userSchema);
module.exports = {User};