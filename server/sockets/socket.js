// Importing required modules
import { Server } from "socket.io";
import http from "http";
import express from "express";

// Creating a Express App for the server
const app = express();

// Creating a http server
const server = http.createServer(app);
// Add a socket server(IO Circuit) on top of our App-Server 
const io = new Server(server, {
    cors:{
        origin: ["http://localhost:5173"],       // frontend app
        methods: ["GET", "POST"]
    }
});

// Creating & Exporting a function to handle realtime messaging
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

// Object to get the online users => {userId: socketId}
const userSocketMap = {};

// Creating a socket connection
io.on("connection", (socket) => {
    console.log("User Connected :: ", socket.id);
    
    // Get the user id of currently logged in user from Client
    const userId = socket.handshake.query.userId;
    if(userId != undefined){
        userSocketMap[userId] = socket.id;
    }

    // io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to events, 
    // can be used both on client & server side
    socket.on("disconnect", () => {
        console.log("User Disconnected :: ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Exporting our app
export {app, io, server};