// Importing required modules
import jwt from "jsonwebtoken";

// Export the generate token function
export const generateToken = (userId, res) => {
    // Generate a token
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );

    // set the cookies
    res.cookie("token", token, {
        maxAge: 3 * 24 * 60 * 60 *1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
};