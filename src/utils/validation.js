import validator from 'validator';
export const validationSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {

        throw new Error("FirstName should be 4-50 charcter")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }
}

export const validationEditProfileData=(req)=>{
    
}