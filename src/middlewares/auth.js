import { UserModel } from "../models/user.js";
import jwt from 'jsonwebtoken'

export const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked")
    const token = "xyz"
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized) {
        res.status(401).send("unauthorized request")
    } else {
        next();
    }
}

export const userAuth = async (req, res, next) => {
    try {
        //getting the cookie
        const { token } = req.cookies;
        //validating the cookie
        const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
        const { _id } = decodedObj;
        // find the user
        const user = await UserModel.findById(_id);
        if (!user) {
            throw new Error("User not found")
        }
        req.user=user
            next(); 

    }
    
    catch (error) {
        res.send("error"+error)

    }
}