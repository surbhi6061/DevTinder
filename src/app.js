import express from 'express'
import { connectDB } from '../config/database.js';
import { UserModel } from '../models/user.js';

const app = express();
app.use(express.json())
app.post("/signup",async(req,res)=>{
    //creating a new instance of the user model
    // const user=new UserModel({
    //     firstName:"Surbhi",
    //     lastName:"Kumari",
    //     emailId:"surbhikumari@gmail.com",
    //     password:"Surbhi@6061"
    // })
    const user=new UserModel(req.body)
    console.log(req.body)
    try{
    await user.save();
    res.send("ok")}
    catch(err){
        res.status(400).send("Error",err.message)
    }
})

//once db connection successful then only start the server
connectDB().then(() => {
    console.log("Data base connection sucessful")
    app.listen(3000, () => {
        console.log("server started succesfully")
    });
})
.catch((err)=>{
    console.log("databse cannot be conected")
})
