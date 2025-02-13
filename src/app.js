import express from 'express'
import { adminAuth,userAuth } from './middlewares/auth.js';

const app=express();

//handle auth middleware for all GET,POST...requests
app.use("/admin",adminAuth)

app.use("/user",userAuth,(req,res)=>{
    res.send("user auth")
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("all data")
})

app.get("/admin/deleteUser",(req,res)=>{
    res.send("deleted users")
})


app.listen(4000,()=>{
    console.log("server started succesfully")
});
