import express from 'express'

const app=express();


//only one response will be send and considered,rest will either ignored or throw error
app.get("/user",(req,res,next)=>{
    res.send({firstName:"surbhi",lastName:"kumari"})
    next()
},(req,res)=>{
    console.log("2nd next router")
    // res.send("response 2")
},(req,res)=>{
    console.log("third route calling")
    // res.send("third route")
})

app.use("/test",(req,res)=>{
    res.send("hello from the server")
})

app.listen(4000,()=>{
    console.log("server started succesfully")
});
