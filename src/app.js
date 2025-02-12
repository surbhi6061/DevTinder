import express from 'express'

const app=express();
app.use("/",(req,res)=>{
    res.send("hello from the dashboard")
})
app.use("/test",(req,res)=>{
    res.send("hello from the server")
})

app.listen(3000,()=>{
    console.log("server started succesfully")
});
