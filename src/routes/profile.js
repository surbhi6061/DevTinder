import express from 'express';
import { userAuth } from '../middlewares/auth.js';
import authRouter from './auth.js';
import { validationSignUpData } from '../utils/validation.js';

const profileRouter=express.Router()

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        if(!validationEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }
const loggedInUser=req.user;
;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
        await loggedInUser.save()
        res.send("Login successfully")
    }

    catch(err){
        res.send("err" +err)
    }
})


export default profileRouter