// Importing required modules
import express from "express";
// Importing our custom controllers
import { loginUser, logoutUser, resgisterUser } from "../controllers/authController.js";

// Creating a router
const router = express.Router();

// Defining the routes
router.post("/login", loginUser);
router.post("/register", resgisterUser);
router.post("/logout", logoutUser);

// Exporting the router
export default router;