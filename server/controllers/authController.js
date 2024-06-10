// Importing Required Modules
import bcrypt from "bcryptjs";

// Importing our data model
import User from "../models/user.js";

// Importing our custom middlewares
import {validateUserLogin, validateUserRegistration} from "../middlewares/authUserValidation.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { generateToken } from "../middlewares/generateToken.js";


// Creating a resgisterUser Controller Function
export const resgisterUser = async (req, res, next) => {
    try {
        // Getting the user data from client side
        const {
            fullName,
            userName,
            email,
            password,
            confirmPassword,
            gender
        } = req.body;

        // Validating the incoming data
        validateUserRegistration(req.body);

        // Check if the user already exist or not
        const existingUser = await User.findOne({
            $or: [
                { userName: userName },
                { email: email }
            ]
        });
        if(existingUser){
            return next(errorHandler(400, "User already exists."));
        }

        // Encrypting the credentials
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Setting default profile pics randomly
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
        
        // Creating a new user
        const newUser = new User({
            fullName: fullName,
            userName: userName,
            email: email,
            password: hashedPassword,
            gender: gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });
        // Saving the newly created user
        await newUser.save();

        // Extract sensitive info from response
        const { 
            password: passwd, 
            email: emailAddr, 
            gender: genderInfo, 
            ...rest
        } = newUser._doc;
        // Send the response on successfull creation
        res.status(201).json({user: rest});

    } catch (error) {
        next(error);
    }
};


// Creating a loginUser Controller Function
export const loginUser = async (req, res, next) => {
    try {
        // Getting the user data from client side
        const {
            userName,
            password
        } = req.body;

        // Validating the incoming data
        validateUserLogin(req.body);

        // Get the required user
        const validUser = await User.findOne({userName});
        
        // If the user don't exist then give error
        if(!validUser)
            return next(errorHandler(404, "User don't exist."));
        // Check password validity
        const isPassCorrect = bcrypt.compareSync(password, validUser?.password || "");
        if(!isPassCorrect)
            return next(errorHandler(400, "Invalid Username or Password"));

        // Generate a token
        generateToken(validUser._id, res);

        // Extract sensitive info from response
        const { 
            password: passwd, 
            email: emailAddr, 
            gender: genderInfo, 
            ...rest
        } = validUser._doc;
        // Send the response on successfull creation
        res.status(201).json({user: rest});

    } catch (error) {
        next(error);
    }
};


// Creating a logoutUser Controller Function
export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token').status(200).json("User has been Logged Out!!");
    } catch (error) {
        next(error);
    }
};