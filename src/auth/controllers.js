const {User} = require("./models");
const jwt = require("jsonwebtoken");
const Key = "sdcjhbsdkuyjhhsj-jkiubsdiun";

const register = async(req,res)=>{
    const {name,username,password} = req.body;
    if(!username || !password){
        return res.json({status: "Error", message: "Username and Password are required"})
    }
    try{

    var userExists = await User.findOne({$or:[{username : req.body.username},{email: req.body.email}]});
    if(userExists){
        //return res.json({status: "Error", message: "Username or Email already exists"});
        throw new Error("Username or Email already exists");
    }
    var user=new User(req.body);
    var token = jwt.sign({_id:user.id},user.salt);
    await user.save();
    //var newUser = await User.create(req.body);
    user.ency_password = undefined;
    user.salt = undefined;
    user.tokens = undefined;
    return res.json({status: "User Registered Successfully", user: user});
}
    catch(e){
        console.log(e);
        res.status(500).json({status:"Error",message:e.message});
    }
};

const loginMiddleware = async(req,res,next)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return res.json({status: "Error", message: "Username and Password are required"});
    }

    var user = await User.findOne({username : username});
    if(!user){
        return res.json({status: "Error", message: "Username not found"});
    }
    if(!user.authenticate(password)){
        return res.json({status: "Error", message: "You entered wrong password"});
    }
    var token = jwt.sign({_id:user.id},Key);
    req.body.token = token;
    next();
}

const login = async(req,res)=>{
    return res.json({status: "Login Successful",token: req.body.token});
};



const reset = async(req,res)=>{
    var user = await User.findOne({username: req.body.username});
    user.password = req.body.newPassword;
    await user.save();
    return res.json({status: "Done", user});
};

module.exports = {register,login,reset,loginMiddleware,Key};