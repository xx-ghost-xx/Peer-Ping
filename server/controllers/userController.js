// Importing Required Modules
import User from "../models/user.js";

// Creating a getUsers Controller Function
export const getUsersList = async (req, res, next) => {
    try {
        // Grab the verified user ID from browser
        const loggedInUserID = req.user._id;

        // Get all the users from DB where user id != logged in user id
        const allFilteredUsers = await User.find({ _id: { $ne: loggedInUserID } }).select("-password").select("-email");

        // Send the fetched users as response
        res.status(200).json(allFilteredUsers);
    } catch (error) {
        next(error);
    }
};