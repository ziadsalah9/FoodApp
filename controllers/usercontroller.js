// import userModel from "../models/userModel";
import jwt  from "jsonwebtoken"; 
import bycrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import dotenv from 'dotenv';




const loginUser = async (req,res)=>{
    
    const {email , password} = req.body;
    try {
        
        const user  = await userModel.findOne({email});
        if(!user){

            return res.json({success:false , message : "user dosent exist"});


        }
        const isMatch = await bycrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false , message : "incorrect password"});

        }

        const token = createToken(user._id);
        
        res.json({success:true , token , user});




    } catch (error) {
        
        console.log(error);
        return res.json({success:false , message : "Error"});

    }

}



function createToken(id) {
return  jwt.sign({ id }, process.env.secret_privatekey);
   
}

const registerUser = async (req,res)=>{

    const {name,password,email} = req.body;
    console.log(req.body)

try {
        const exist = await userModel.findOne({email});
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        if(exist){
           return res.json({success:false , message : "user already exist"});
           
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Email not valid" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Enter a strong password" });
        }


        console.log("Secret key:", process.env.secret_privatekey);

        const salt = await bycrypt.genSalt(10);
        const hashedpassword = await bycrypt.hash(password,salt);
        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedpassword,

        })  ;

        console.log(newUser);
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true , token});
} catch (error) {
    console.log(error);
    res.json({success:false , message : "Error"})
}

}






export {loginUser , registerUser}