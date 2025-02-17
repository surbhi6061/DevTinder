import express from 'express'
import { connectDB } from './config/database.js';
import { UserModel } from './models/user.js';
import { validationSignUpData } from './utils/validation.js';
import bcrypt from 'bcrypt'

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    //validation of data is required
    validationSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body
    //Encrypt the password
    const passswordHash = await bcrypt.hash(password, 10);
    console.log(passswordHash);

    //store in the database

    const user = new UserModel({
        firstName,
        lastName,
        emailId,
        password: passswordHash
    })
    console.log(req.body)
    try {
        await user.save();
        res.send("User added successfully")
    }
    catch (err) {
        res.status(400).send("Error" + err.message)
    }
})

app.post("/login", async(req ,res)=> {
    try{
        const { emailId, password } = req.body
        const user = await UserModel.findOne({ emailId: emailId });
        if(!user) {
            throw new Error("invalid user")
        }

    // const isPasswordValid=bcrypt.compare("Surbhi@6061","$2b$10$g5JRjbkk/zhZkyQc7lTCSejio4v6PNazsLEobqD.3AiKRjB6rsAHy")
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(isPasswordValid){
        res.send("LOgin success")
    }else{
        throw new Error("password incorrect")
    }

    }
    catch(err) {
        res.status(400).send("ERROR" + err.message)
    }
})

//Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId

    try {
        const user = await UserModel.find({ emailId: userEmail });
        //***send the user data back after filtering(finding)
        res.send(user)
    } catch (err) {
        res.status(400).send("error while fetching userEmailId")
    }
})

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
