const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            })
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);

        }
        catch (error) {
            return res.status(500).json({
                sucess: false,
                message: "Error in hashing paswword."
            })
        }
        const profilePicture = `https://api.dicebear.com/5.x/initials/svg?seed=${name} ${""}`

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profilePicture
        });
        return res.status(201).json({
            success: true,
            message: "User created successfully."
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// sign in ka handler

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        let userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({
                success: false,
                message: "User does not exist."
            });
        }

        if  ( await bcrypt.compare(password, userExist.password)) {

            const payload={
                email:userExist.email,
                name:userExist.name,
                profilePicture:userExist.profilePicture
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"1d"
            });
            userExist.password=undefined;
            userExist=userExist.toObject();
            userExist.token=token;
            
            // console.log(token)

            const options={
                expires: new Date(Date.now()+ 7*24*60*60*1000),
                httpOnly:true
            }

            res.cookie("token",token,options).status(200).json({    
                success:true,
                message:"User signed in successfully.", 
                user:userExist
            });
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is incorrect."
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}


// sign out ka handler
exports.signout=async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "User sign out successsfully."
        })
    }
    catch(error){
        console.log("Error in sign ou",error);
        return res.status(500).json({
            success: false,
            message: "Sign out successfully."
        })
    }
}