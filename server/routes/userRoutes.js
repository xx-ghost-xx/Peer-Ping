// Importing required modules
import express from "express";
// Importing our custom controllers
import { getUsersList } from "../controllers/userController.js";
// Importing our custom middlewares
import verifyUser from "../middlewares/verifyUser.js";

// Creating a router
const router = express.Router();

// Defining the routes
router.get("/getUsersList", verifyUser, getUsersList);

// Exporting the router
export default router;