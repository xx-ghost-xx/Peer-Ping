// Importing required modules
import express from "express";
import  cookieParser  from "cookie-parser";
import dbConnect  from "./database/dbConnection.js";
import { app, server } from "./sockets/socket.js";

// Importing the custom routes
import authRoutes from "./routes/authRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import userRoutes from "./routes/userRoutes.js";


// Configuring the env file
import dotenv from "dotenv";
dotenv.config();

// Using our Express App by importing from Socket
// Setting up the middlewares
app.use(express.json());                                // Middleware to parse the incoming requests with JSON payload
app.use(express.urlencoded({ extended: true }));        // Middleware to parse URL-encoded bodies
app.use(cookieParser());                                // Middlewares to parse the cookies 

// Setting up the custom routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


// Starting the Express App Server
// Starting the Express App Server
const PORT = process.env.PORT || 5000;
dbConnect().then(() => {
    console.log("Server connected to DB...");
    server.listen(PORT, () => {
        console.log(`Server up & running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
});

// Express Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error...";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});