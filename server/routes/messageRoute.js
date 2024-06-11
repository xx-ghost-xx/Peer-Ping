// Importing required modules
import express from "express";
// Importing our custom controllers
import { receiveMessage, sendMessage } from "../controllers/messageController.js";
// Importing our custom middlewares
import verifyUser from "../middlewares/verifyUser.js";

// Creating a router
const router = express.Router();

// Defining the routes
router.post("/send/:id", verifyUser, sendMessage);
router.get("/receive/:id", verifyUser, receiveMessage);

// Exporting the router
export default router;