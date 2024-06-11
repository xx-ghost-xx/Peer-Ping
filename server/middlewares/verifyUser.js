// Importing required modules
import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler.js";
import User from "../models/user.js";

const verifyUser = async (req, res, next) => {
    try {
        // Get the token of the user
        const token = req.cookies.token;
        if(!token)
            return next(errorHandler(401, "Unauthorized"));

        // Verify the obtained token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded)
            return next(errorHandler(401, "Unauthorized - Invalid Token"));
        // Find the user and check the Id & then remove password before sending it
        const user = await User.findById(decoded.userId).select("-password");
        if(!user)
            return next(errorHandler(404, "User don't exist."));
        // set the user to be obtained user
        req.user = user;
        // Call the immediate next function
        next();
    } catch (error) {
        next(error);
    };
};

// Exporting the module
export default verifyUser;