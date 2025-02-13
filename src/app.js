import express from 'express'

const app=express();

// This will only handle GET call to /user
app.get("/user",(req,res)=>{
    res.json({firstName:"surbhi",lastName:"kumari"})

})

//this will match all the HTTP method API calls to /
// app.use("/",(req,res)=>{
//     res.send("hello from the dashboard")
// })
app.use("/test",(req,res)=>{
    res.send("hello from the server")
})

app.listen(4000,()=>{
    console.log("server started succesfully")
});
