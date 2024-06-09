// Importing required modules
import express from "express";
import  cookieParser  from "cookie-parser";
import dbConnect  from "./database/dbConnection.js";

// Importing the custom routes
import authRoutes from "./routes/authRoute.js";


// Configuring the env file
import dotenv from "dotenv";
dotenv.config();

// Creating our Express App
const app = express();

// Setting up the middlewares
app.use(express.json());                                // Middleware to parse the incoming requests with JSON payload
app.use(express.urlencoded({ extended: true }));        // Middleware to parse URL-encoded bodies
app.use(cookieParser());                                // Middlewares to parse the cookies 

// Setting up the routes
app.use("/api/auth", authRoutes);



// Starting the Express App Server
const PORT = process.env.PORT || 5000;
dbConnect().then(() => {
    console.log("Server connected to DB...");
    app.listen(PORT, () => {
        console.log(`Server up & running at http://localhost:${PORT}`);
    });
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