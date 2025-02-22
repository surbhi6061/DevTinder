import express from 'express';
import { validationSignUpData } from '../utils/validation.js';
import { UserModel } from '../models/user.js';
const authRouter=express.Router()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

authRouter.post("/signup", async (req, res) => {
    //validation of data is required
    validationSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body
    //Encrypt the password
    const passswordHash = await bcrypt.hash(password, 10);
    console.log(passswordHash);

    //store in the database

    const user = new UserModel({
        firstName,
        lastName,
        emailId,
        password: passswordHash
    })
    console.log(req.body)
    try {
        await user.save();
        res.send("User added successfully")
    }
    catch (err) {
        res.status(400).send("Error" + err.message)
    }
})
authRouter.post("/login", async(req ,res)=> {
    try{
        const { emailId, password } = req.body
        const user = await UserModel.findOne({ emailId: emailId });
        if(!user) {
            throw new Error("invalid user")
        }

    // const isPasswordValid=bcrypt.compare("Surbhi@6061","$2b$10$g5JRjbkk/zhZkyQc7lTCSejio4v6PNazsLEobqD.3AiKRjB6rsAHy")
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(isPasswordValid){
        //create a jWT token
        const token=jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"1d"})
        res.cookie("token",token)
        res.send("Login successful")
    }else{
        throw new Error("password incorrect")
    }
    }
    catch(err) {
        res.status(400).send("ERROR" + err.message)
    }
})

authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null)
    res.send("logout done")
})

export default authRouter