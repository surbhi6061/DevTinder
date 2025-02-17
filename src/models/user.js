import mongoose from "mongoose";
import validator from 'validator'
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:58,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" +value)
            }
        }
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
});

export const UserModel=mongoose.model("User",userSchema)