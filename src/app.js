import express from 'express'

const app=express();
app.get("/getUserData",(req,res)=>{

    throw new Error("hsjgdjsdf");
res.send("user Data Sent")
})

//err should be always first parameter
app.use("/",(err,req,res,next)=>{
if(err){
    res.status(500).send("something went wrong")
}
})

app.listen(4000,()=>{
    console.log("server started succesfully")
});
