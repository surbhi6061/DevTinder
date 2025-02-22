import express from 'express'
import { connectDB } from './config/database.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
import profileRouter from './routes/profile.js';
import requestRouter from './routes/request.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
 
app.use("/",authRouter)
app.use("/",profileRouter);
app.use("/",requestRouter)

//once db connection successful then only start the server
connectDB().then(() => {
    console.log("Data base connection sucessful")
    app.listen(3000, () => {
        console.log("server started succesfully")
    });
})
    .catch((err) => {
        console.log("databse cannot be conected")
    })
